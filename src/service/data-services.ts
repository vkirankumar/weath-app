import { ApiMethods, DataSource, DataSourceType } from "../common/types";
import axios, { AxiosPromise, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";

export let configs: DataSource[] = [
    /*{
    "type": "WeatherApi",
    "key": "95e51729e9e94f0781532711220910",
    "endpoint": "http://api.weatherapi.com/v1/",
    "methods": {
        "current": {
            "method": "current.json",
            "params": ["key", "q", "aqi"]
        },
        "forecast": {
            "method": "forecast.json",
            "params": ["key", "q", "aqi", "days", "alerts"]
        },
        "search": {
            "method": "search.json",
            "params": ["key", "q"]
        }
    }
}*/];

const headers: AxiosRequestHeaders = {
    "Content-Type": "application/json",
    // "Access-Control-Max-Age": 86400
} 

const requestConfig: AxiosRequestConfig = {
    method: "GET",
    headers,
    data: {}
}

const getDataSource = (type: DataSourceType): DataSource | undefined => {
    return configs.find((source: DataSource) => source.type === type);
}

export const getData = (dataSourceType: DataSourceType, searchKey: string,
        method: ApiMethods, days: number  = 5 ): AxiosPromise => { 
    let dataSource: DataSource | undefined = getDataSource(dataSourceType);
    let params = {
        key: dataSource?.key,
        q: searchKey,
        aqi: "no",
        days
    }
    const url = `${dataSource?.endpoint}${dataSource?.methods[method].method}`
    return axios({...requestConfig, params, url});
}

export const getConfig = async () => {
    const url = "http://localhost:32201/weath-app/getconfig";
    try {
        const response: AxiosResponse = await axios(url);
        configs = response.data as DataSource[];
    } catch (error) {
        throw new Error(`Config fetch failed!`);
    }
    return true;
}