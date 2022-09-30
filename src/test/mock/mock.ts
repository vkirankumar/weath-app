import moment from "moment";
import { AppContext, Condition, 
    DataSourceType, Forecast, Theme, Weather } from "../../common/types";

export const mockLocalStorage = {
    "theme": 0,
    "dataSourceType": "WeatherApi",
    "locations": [
        {
            "id": "35009408-1684-4879-888b-8bd6be921728",
            "country": "India",
            "isCurrent": false,
            "lat": 12.98,
            "lon": 77.58,
            "name": "Bangalore City",
            "label": "Bangalore City",
            "region": "Karnataka",
            "time": null
        },
        {
            "id": "c23f903e-b69d-4b19-b17c-26fc2ea9c276",
            "country": "India",
            "isCurrent": false,
            "lat": 12.93,
            "lon": 79.13,
            "name": "Vellore",
            "label": "Vellore",
            "region": "Tamil Nadu",
            "time": null
        }
    ]
}

export const getMockContext = (): AppContext => {
    return {
        theme: Theme.dark,
        locations: [{
                "id": "35009408-1684-4879-888b-8bd6be921728",
                "country": "India",
                "isCurrent": false,
                "lat": "12.98",
                "lon": "77.58",
                "name": "Bangalore City",
                "label": "Bangalore City",
                "region": "Karnataka",
                "time": moment()
            },
            {
                "id": "35009408-1684-4879-888b-8bd6be921721",
                "country": "India",
                "isCurrent": false,
                "lat": "12.98",
                "lon": "77.58",
                "name": "Vellore",
                "label": "Vellore",
                "region": "Karnataka",
                "time": moment()
        }],
        dataSourceType: DataSourceType.WEATHER_API,
        removeLocation: jest.fn()
    }
}

export const getMockWeatherData = (): Weather => {
    return {
        condition: Condition.SUN,
        date: moment(),
        feelCel: 29,
        feelFar: 94,
        humidity: 80,
        id: "test-id-weather",
        tempCel: 27,
        tempFar: 96,
        text: "Sunny",
        time: moment(),
        windKPH: 12,
        windMPH: 1
    }
}

export const getMockForecast = (): Forecast => {
    return {
        id: "forecast-id",
        day: {
            avgTempCel: 22,
            avgTempFar: 92,
            condition: Condition.CLOUDY,
            date: moment("2022-09-29T12:02:11.958Z"),
            id: "test-day-id",
            maxTempCel: 32,
            maxTempFar: 100,
            minTempCel: 21,
            minTempFar: 94,
            text: "Partly Cloudy"
        }
    }
}

export const sortedForecastDesc = [
    {
        id: "forecast-id",
        day: {
            avgTempCel: 22,
            avgTempFar: 92,
            condition: Condition.CLOUDY,
            date: moment("2022-09-29T12:02:11.958Z"),
            id: "test-day-id",
            maxTempCel: 32,
            maxTempFar: 100,
            minTempCel: 21,
            minTempFar: 94,
            text: "Partly Cloudy"
        }
    },
    {
        id: "forecast-id",
        day: {
            avgTempCel: 22,
            avgTempFar: 92,
            condition: Condition.SUN,
            date: moment("2022-09-28T12:02:11.958Z"),
            id: "test-day-id",
            maxTempCel: 32,
            maxTempFar: 100,
            minTempCel: 21,
            minTempFar: 94,
            text: "Sunny"
        }
    }];

export const sortedForecastAsc = [
    {
        id: "forecast-id",
        day: {
            avgTempCel: 22,
            avgTempFar: 92,
            condition: Condition.SUN,
            date: moment("2022-09-28T12:02:11.958Z"),
            id: "test-day-id",
            maxTempCel: 32,
            maxTempFar: 100,
            minTempCel: 21,
            minTempFar: 94,
            text: "Sunny"
        }
    },
    {
        id: "forecast-id",
        day: {
            avgTempCel: 22,
            avgTempFar: 92,
            condition: Condition.CLOUDY,
            date: moment("2022-09-29T12:02:11.958Z"),
            id: "test-day-id",
            maxTempCel: 32,
            maxTempFar: 100,
            minTempCel: 21,
            minTempFar: 94,
            text: "Partly Cloudy"
        }
    }];

export const getDataRequest = {"data": {}, "headers": {"Content-Type": "application/json"}, "method": "GET", "params": {"aqi": "no", "days": 5, "key": "260bad4619044145bf830607222409", "q": "bangalore"}, 
"url": "http://api.weatherapi.com/v1/forecast.json"};

export const mockLocationResponse = [
    {
        "id": 1113203,
        "name": "Dilli",
        "region": "Delhi",
        "country": "India",
        "lat": 28.67,
        "lon": 77.22,
        "url": "dilli-delhi-india"
    },
    {
        "id": 1112321,
        "name": "Delhi",
        "region": "Delhi",
        "country": "India",
        "lat": 28.67,
        "lon": 77.22,
        "url": "delhi-delhi-india"
    },
    {
        "id": 1112297,
        "name": "Dehli",
        "region": "Delhi",
        "country": "India",
        "lat": 28.67,
        "lon": 77.22,
        "url": "dehli-delhi-india"
    },
    {
        "id": 1127063,
        "name": "Old Delhi",
        "region": "Delhi",
        "country": "India",
        "lat": 28.67,
        "lon": 77.22,
        "url": "old-delhi-delhi-india"
    },
    {
        "id": 1117378,
        "name": "Jawaharnagar",
        "region": "Delhi",
        "country": "India",
        "lat": 28.68,
        "lon": 77.2,
        "url": "jawaharnagar-delhi-india"
    },
    {
        "id": 1112323,
        "name": "Delhi Sabzimandi",
        "region": "Delhi",
        "country": "India",
        "lat": 28.68,
        "lon": 77.2,
        "url": "delhi-sabzimandi-delhi-india"
    },
    {
        "id": 1130839,
        "name": "Sabzi Mandi",
        "region": "Delhi",
        "country": "India",
        "lat": 28.68,
        "lon": 77.2,
        "url": "sabzi-mandi-delhi-india"
    },
    {
        "id": 1133518,
        "name": "Subzi Mundi",
        "region": "Delhi",
        "country": "India",
        "lat": 28.68,
        "lon": 77.2,
        "url": "subzi-mundi-delhi-india"
    },
    {
        "id": 1119148,
        "name": "Karol Bagh",
        "region": "Delhi",
        "country": "India",
        "lat": 28.65,
        "lon": 77.2,
        "url": "karol-bagh-delhi-india"
    },
    {
        "id": 1111582,
        "name": "Connaught Place",
        "region": "Delhi",
        "country": "India",
        "lat": 28.63,
        "lon": 77.22,
        "url": "connaught-place-delhi-india"
    }
];

export const mockForecastResponse = {
    "location": {
        "name": "Delhi",
        "region": "Delhi",
        "country": "India",
        "lat": 28.67,
        "lon": 77.22,
        "tz_id": "Asia/Kolkata",
        "localtime_epoch": 1664268263,
        "localtime": "2022-09-27 14:14"
    },
    "current": {
        "last_updated_epoch": 1664267400,
        "last_updated": "2022-09-27 14:00",
        "temp_c": 32.0,
        "temp_f": 89.6,
        "is_day": 1,
        "condition": {
            "text": "Mist",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/143.png",
            "code": 1030
        },
        "wind_mph": 5.6,
        "wind_kph": 9.0,
        "wind_degree": 270,
        "wind_dir": "W",
        "pressure_mb": 1008.0,
        "pressure_in": 29.77,
        "precip_mm": 0.0,
        "precip_in": 0.0,
        "humidity": 52,
        "cloud": 25,
        "feelslike_c": 31.5,
        "feelslike_f": 88.7,
        "vis_km": 5.0,
        "vis_miles": 3.0,
        "uv": 9.0,
        "gust_mph": 6.9,
        "gust_kph": 11.2
    },
    "forecast": {
        "forecastday": [
            {
                "date": "2022-09-27",
                "date_epoch": 1664236800,
                "day": {
                    "maxtemp_c": 38.5,
                    "maxtemp_f": 101.3,
                    "mintemp_c": 26.1,
                    "mintemp_f": 79.0,
                    "avgtemp_c": 31.2,
                    "avgtemp_f": 88.2,
                    "maxwind_mph": 9.8,
                    "maxwind_kph": 15.8,
                    "totalprecip_mm": 0.0,
                    "totalprecip_in": 0.0,
                    "avgvis_km": 10.0,
                    "avgvis_miles": 6.0,
                    "avghumidity": 53.0,
                    "daily_will_it_rain": 0,
                    "daily_chance_of_rain": 0,
                    "daily_will_it_snow": 0,
                    "daily_chance_of_snow": 0,
                    "condition": {
                        "text": "Sunny",
                        "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                        "code": 1000
                    },
                    "uv": 8.0
                },
                "hour": []
            }
        ]
    }
}

export const mockConfig = [{
    "type": "WeatherApi",
    "key": "260bad4619044145bf830607222409",
    "endpoint": "http://api.weatherapi.com/v1/",
    "methods": {
        "current": {
            "method": "current.json",
            "params": ["key", "q", "aqi"]
        },
        "forecast": {
            "method": "forecast.json",
            "params": ["key", "q", "aqi", "alerts"]
        },
        "search": {
            "method": "search.json",
            "params": ["key", "q"]
        }
    }
}];