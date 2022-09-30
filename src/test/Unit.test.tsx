import moment from "moment";
import { Condition, DataSourceType, DATE_FORMAT_DISP, SORT_MODE } from "../common/types";
import { convertDateToText, getImageByCondition, getLocalStorage, getTextByCondition, sortForecast, translate } from "../common/utils";
import { mockForecastResponse, mockLocalStorage, sortedForecastAsc, sortedForecastDesc } from "./mock/mock";

describe("Unit test - tests pure functions", () =>{
  test('get image style by the condition', () => {
    expect(getImageByCondition(Condition.CLEAR)).toBe("clear");
    expect(getImageByCondition(Condition.SUN)).toBe("sunny");
    expect(getImageByCondition(Condition.CLOUDY)).toBe("cloudy");
    expect(getImageByCondition(Condition.RAIN)).toBe("rain");
    expect(getImageByCondition(Condition.STORM)).toBe("storm");
    expect(getImageByCondition(Condition.THUNDER)).toBe("thunder");
    expect(getImageByCondition(undefined)).toBe("other");
  });

  test('test local storage mock', () => {
    expect(getLocalStorage()).toEqual(mockLocalStorage);
  });

  test('test translate rawdata', () => {
    expect(translate(DataSourceType.WEATHER_API, mockForecastResponse))
      .not.toBeNull();
  });

  test('test translate without rawdata to return empty', () => {
    expect(translate(DataSourceType.WEATHER_API, {}))
      .toEqual({});
  });

  test('test sort mode', () => {
    expect(sortForecast(SORT_MODE.DESC, sortedForecastAsc))
    .toEqual(sortedForecastDesc)
  });

  test('test convert date to text - today', () => {
    expect(convertDateToText())
    .toEqual("Today")
  });

  test('test convert date to text - tomorrow', () => {
    expect(convertDateToText(moment().add(1 ,"days")))
    .toEqual("Tomorrow")
  });

  test('test convert date to text - date', () => {
    expect(convertDateToText(moment().add(2 ,"days")))
    .toEqual(moment().add(2, "days").format(DATE_FORMAT_DISP))
  });

  test('test get tetx by condition', () => {
    expect(getTextByCondition(Condition.SUN))
    .toEqual("Sunny")
    expect(getTextByCondition(Condition.CLEAR))
    .toEqual("Clear skies")
    expect(getTextByCondition(Condition.CLOUDY))
    .toEqual("Pleasant and Cloudy")
    expect(getTextByCondition(Condition.RAIN))
    .toEqual("rain")
    expect(getTextByCondition(Condition.STORM))
    .toEqual("storm")
    expect(getTextByCondition(Condition.THUNDER))
    .toEqual("thunder")
  });
});

