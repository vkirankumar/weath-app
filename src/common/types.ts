import * as moment from "moment";

export const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm";
export const DATE_FORMAT = "YYYY-MM-DD";
export const DATE_FORMAT_DISP = "DD MMM";
export const LOCAL_STORAGE_KEY = "weather-search-data";

export enum DataSourceType {
    WEATHER_API= "WeatherApi"
}

export enum ApiMethods {
    CURRENT = "current",
    FORECAST = "forecast",
    SEARCH = "search"
}

export enum SORT_MODE {
    ASC = "Asc",
    DESC = "Desc"
}

export enum TEMP_DISPLAY_UNIT {
    CELSIUS = "Celsius",
    FARENHEIT = "Farenheit"
}

export type DataSource = {  
    type: string;
    key:  string;
    endpoint: string;  
    methods: Methods;
}

export type Methods = {
    [prop in keyof SourceMethod]: SourceParams;
}

export type SourceMethod = {
    current: string,
    forecast: string,
    search: string
}

export type SourceParams = {
    method: string,
    params: string[]
}

export type WeatherData = {
    location?: Location,
    current?: Weather,
    forecast?: Forecast[]
}

export type Forecast = {
    id: string,
    day?: Day,
    hour?: Weather[]
}

export type Day = {
    id:string,
    text: string,
    date: moment.Moment,
    maxTempCel: number,
    maxTempFar: number,
    minTempCel: number,
    minTempFar: number,
    avgTempCel: number,
    avgTempFar: number,
    condition: Condition
}

export type Weather = {
    id: string,
    date: moment.Moment,
    time: moment.Moment,
    condition: Condition,
    text: string,
    tempCel: number,
    tempFar: number,
    windMPH: number,
    windKPH: number,
    humidity: number,
    feelCel: number,
    feelFar: number
}

export type Location = {
    id: string,
    name: string,
    label: string,
    region?: string,
    country?: string,
    lat?: string,
    lon?: string,
    time?: moment.Moment,
    isCurrent?: boolean
}

export enum Condition {
    SUN = "sun",
    CLEAR = "clear",
    CLOUDY = "cloud",
    RAIN = "rain",
    STORM = "storm",
    THUNDER = "thunder",
    MIST = "mist",
    WIND = "wind"
}

export enum Theme {
    light, dark
}

export type AppContext = {
    theme: Theme,
    locations: Location[],
    dataSourceType: DataSourceType,
    removeLocation: (location: Location) => void
}
