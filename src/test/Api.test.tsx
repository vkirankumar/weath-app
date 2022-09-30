import * as api from "../service/data-services";
import axios, { AxiosStatic } from 'axios'

import { ApiMethods, DataSourceType } from "../common/types";
import { getDataRequest, mockConfig } from "./mock/mock";

export interface AxiosMock extends AxiosStatic {
    mockResolvedValue: Function
    mockRejectedValue: Function
  }
  
jest.mock('axios');
const mockedAxios = axios as AxiosMock;

describe("API testing - Tests data services", () => {
    test("test get config api", async () => {
        mockedAxios.mockResolvedValue({
            data: mockConfig
          });
        await api.getConfig();
        expect(api.configs).toEqual(mockConfig);
        const url = getDataRequest;
        api.getData(DataSourceType.WEATHER_API, "bangalore", ApiMethods.FORECAST);
        expect(axios).toBeCalledWith(url);
    });
});