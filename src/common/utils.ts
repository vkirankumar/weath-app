import moment from "moment";
import { createContext } from "react";
import { v4 as uuid } from "uuid";
import { AppContext, Condition, DataSourceType, DATE_FORMAT, DATE_FORMAT_DISP, DATE_TIME_FORMAT, 
    Day, 
    Forecast, 
    LOCAL_STORAGE_KEY, 
    Location, SORT_MODE, Theme, Weather, WeatherData } from "./types";

export const setLocalStorage = (value: Partial<AppContext>): void => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
}

export const getLocalStorage = (): any => {
    const localStoragedata = localStorage.getItem(LOCAL_STORAGE_KEY) ?? null;
    const data: Partial<AppContext> = localStoragedata ? JSON.parse(localStoragedata) : null;
    return data ?? {theme: Theme.light, dataSourceType: DataSourceType.WEATHER_API,
        locations:[ {
            name: "Amsterdam",
            id: 1
        }]};
}

export const MyAppContext = createContext<AppContext>(getLocalStorage());

export const translate = (sourceType: DataSourceType, 
    rawData: any): WeatherData => {
    let weatherData: WeatherData = {};
    if(Object.keys(rawData).length > 0) {
        if (sourceType === DataSourceType.WEATHER_API) {
            weatherData.location = processLocationData(rawData?.location);
            weatherData.current = processCurrentWeather(rawData?.current);
            weatherData.forecast = rawData?.forecast ? 
            processForecastWeather(rawData?.forecast) : [];
        }
    }
    return weatherData;
}

export const translateSearchLocationData = (rawData: any): Location[] => {
    let parsedLocationData: Location[] = [];
    if (Array.isArray(rawData)) { 
        Array.from(rawData).forEach((location: any) => {
            parsedLocationData.push(processLocationData(location));
        });
    }
    return parsedLocationData;
}

const processLocationData = (rawLocData: any): Location => {
    return {
        id: uuid(),
        country: rawLocData?.country,
        isCurrent: false,
        lat: rawLocData?.lat,
        lon: rawLocData?.lon,
        name: rawLocData?.name,
        label: rawLocData?.name,
        region: rawLocData?.region,
        time: moment(rawLocData?.localtime, DATE_TIME_FORMAT)
    };
}

const processCurrentWeather = (rawData: any): Weather => {
    return {
        id: uuid(),
        windMPH: rawData?.wind_mph,
        windKPH: rawData?.wind_kph,
        date: moment(rawData?.last_updated, DATE_TIME_FORMAT),
        tempCel: rawData?.temp_c,
        tempFar: rawData?.temp_f,
        feelCel: rawData?.feelslike_c,
        feelFar: rawData?.feelslike_f,
        humidity: rawData?.humidity,
        time: moment(rawData?.time, DATE_TIME_FORMAT),
        condition: conditionOfTheDay(rawData?.condition?.text),
        text: rawData?.condition?.text
    };
}

const processForecastWeather = (rawData: any): Forecast[] => {
    let weatherData: Forecast[] = [];
    if (Array.isArray(rawData?.forecastday)) {  
        Array.from(rawData?.forecastday).forEach((forecastDay: any) => {
            let day: Day = {
                id: uuid(),
                date: moment(forecastDay?.date, DATE_FORMAT),
                avgTempCel: forecastDay?.day?.avgtemp_c,
                avgTempFar: forecastDay?.day?.avgtemp_f,
                minTempCel: forecastDay?.day?.mintemp_c,
                minTempFar: forecastDay?.day?.mintemp_f,
                maxTempCel: forecastDay?.day?.maxtemp_c,
                maxTempFar: forecastDay?.day?.maxtemp_f,
                condition: conditionOfTheDay(forecastDay?.day?.condition.text),
                text: forecastDay?.day?.condition.text
            }
            let hour: Weather[] = [];
            if (Array.isArray(forecastDay?.hour)) {  
                Array.from(forecastDay?.hour).forEach(forecastHour => {
                    hour.push(processCurrentWeather(forecastHour));
                })
                
            }
            weatherData.push({ day, hour, id: uuid() });
        });
    }
    return weatherData;
}

const conditionOfTheDay = (condition: string): Condition => {
    if (condition?.toLowerCase().indexOf(Condition.STORM)> -1) {
        return Condition.STORM;
    } else if (condition?.toLowerCase().indexOf(Condition.THUNDER) > -1) {
        return Condition.THUNDER;
    } else if (condition?.toLowerCase().indexOf(Condition.CLEAR) > -1) {
        return Condition.CLEAR;
    } else if (condition?.toLowerCase().indexOf(Condition.CLOUDY) > -1) {
        return Condition.CLOUDY;
    } else if (condition?.toLowerCase().indexOf(Condition.SUN) > -1) {
        return Condition.SUN;
    } else if (condition?.toLowerCase().indexOf(Condition.RAIN) > -1) {
        return Condition.RAIN;
    } else {
        return Condition.MIST;
    }
}

export const getImageByCondition = (condition: Condition | undefined): string => {
    switch(condition) {
        case Condition.SUN:
            return "sunny";
        case Condition.CLEAR:
            return "clear";
        case Condition.CLOUDY:
            return "cloudy";
        case Condition.RAIN:
            return "rain";
        case Condition.STORM:
            return "storm";
        case Condition.THUNDER:
            return "thunder";
        default:
            return "other";
    }
}

export const getTextByCondition = (condition: Condition | undefined): string => {
    switch(condition) {
        case Condition.SUN:
                return "Sunny";
        case Condition.CLEAR:
                return "Clear skies";
        case Condition.CLOUDY:
            return "Pleasant and Cloudy";
        case Condition.RAIN:
                return "rain";
        case Condition.STORM:
                return "storm";
        case Condition.THUNDER:
                return "thunder";
        default:
            return '';
    }
}

export const convertDateToText = (date: moment.Moment = moment()): string => {
    const currDate = moment(date).format(DATE_FORMAT_DISP);
    if (moment().format(DATE_FORMAT_DISP) === currDate) {
        return "Today";
    } else if (moment().add(1, "days").format(DATE_FORMAT_DISP) === currDate) {
        return "Tomorrow";
    } else {
        return currDate;
    }
}

export const sortForecast = (sortMode: SORT_MODE, dataProvider: Forecast[] | undefined): Forecast[] | undefined => {
    return dataProvider?.sort( 
    (forecast1: Forecast, forecast2: Forecast) => {
        if (sortMode === SORT_MODE.DESC) {
            if (forecast1.day?.date.isAfter(forecast2.day?.date)) {
                return -1;
            } else if (forecast1.day?.date.isBefore(forecast2.day?.date)) {
                return 1;
            } 
        } else {
            if (forecast1.day?.date.isAfter(forecast2.day?.date)) {
                return 1;
            } else if (forecast1.day?.date.isBefore(forecast2.day?.date)) {
                return -1;
            }
        }
        return 0;
    });
}