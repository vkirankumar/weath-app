import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { MyAppContext } from '../common/utils';
import Widget from '../components/Widget';
import { getMockContext, getMockForecast, getMockWeatherData, mockConfig, mockForecastResponse, mockLocalStorage } from './mock/mock';
import { v4 as uuid } from 'uuid';
import WeatherCell from '../components/WeatherCell';
import { SORT_MODE, TEMP_DISPLAY_UNIT, Theme } from '../common/types';
import ForecastWeather from '../components/ForecastWeather';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('http://localhost:5001/weath-app/getconfig', (req, res, ctx) => {
    return res(
      ctx.status(200, 'Mocked status'),
      ctx.json(mockConfig),
    )
  }),
  rest.get("http://api.weatherapi.com/v1/forecast.json", (req, res, ctx) => {
    return res(
      ctx.status(200, 'Mocked status'),
      ctx.json(mockForecastResponse),
    )
  })
);


describe("Component testing", () => {
  beforeAll(() => {
    server.listen();
  })

  afterEach(() => server.resetHandlers());
  
  afterAll(() => server.close());

  test('renders learn react link', async () => {
    const { findByTestId } = render(<App />);
    const modeSwitch = await findByTestId("mode-switch");
    expect(modeSwitch).toBeInTheDocument();
  });

  test('render location widgets from local storage', async () => {
      const { findByTestId } = render(<App />);
      const widgetContainer = await findByTestId("widget-container");
      await waitFor(() => {
        expect(widgetContainer.children).toHaveLength(2);
      });
  });
  
  test('widget rendering from location through context', async () => {
      const { findByTestId } = render(
      <MyAppContext.Provider value={getMockContext()}>
        <Widget key={uuid()} widgetLocation={getMockContext().locations[0]}/>
      </MyAppContext.Provider>);
      const forecastRange = await findByTestId("forecast-range");
      expect(forecastRange.hasChildNodes).toBeTruthy();
  });
  
  test('weather cell rendering for the passed weather prop', async () => {
      const { findByTestId } = render(
        <WeatherCell key={uuid()} selectedUnit={TEMP_DISPLAY_UNIT.CELSIUS}
          weather={getMockWeatherData()}/>);
      const weatherContainer = await findByTestId("current-weather-container");
      expect(weatherContainer).toBeInTheDocument();
  });
  
  test('weather cell rendering failed with no weather data', async () => {
      render(
      <WeatherCell key={uuid()} selectedUnit={TEMP_DISPLAY_UNIT.CELSIUS}/>);
      const weatherContainer = screen.queryByText('current-weather-container');
      expect(weatherContainer).toBeNull();
  });
  
  test('forecast weather component expected to be rendered as filter', async () =>{
    const { findByTestId } = render(
      <MyAppContext.Provider value={getMockContext()}>
        <ForecastWeather onSort={jest.fn()} onUnitChange={jest.fn()}
          isHeader={true} selectedSortMode={SORT_MODE.ASC}
            selectedUnit={TEMP_DISPLAY_UNIT.CELSIUS}/>
      </MyAppContext.Provider>);
      const forecastFilter = await findByTestId("forecast-filter");
      expect(forecastFilter).toBeInTheDocument();
  });
  
  test('forecast weather component to display weather range', async () =>{
    const { findByTestId } = render(
      <MyAppContext.Provider value={getMockContext()}>
        <ForecastWeather onSort={jest.fn()} onUnitChange={jest.fn()}
            isHeader={false} selectedSortMode={SORT_MODE.ASC}
            selectedUnit={TEMP_DISPLAY_UNIT.CELSIUS}
            forecast={getMockForecast()}/>
      </MyAppContext.Provider>);
      const forecastFilter = await findByTestId("forecast-widget");
      expect(forecastFilter).toBeInTheDocument();
  });
  
  test('forecast weather component to show cloudy', async () =>{
    const { findByTestId } = render(
      <MyAppContext.Provider value={getMockContext()}>
        <ForecastWeather onSort={jest.fn()} onUnitChange={jest.fn()}
            isHeader={false} selectedSortMode={SORT_MODE.ASC}
            selectedUnit={TEMP_DISPLAY_UNIT.CELSIUS}
            forecast={getMockForecast()}/>
      </MyAppContext.Provider>);
      const forecastFilter = await findByTestId("forecast-current-image");
      expect(forecastFilter).toHaveClass("cloudy");
  });
  
  test('test dark theme', async () =>{
    Storage.prototype.getItem = (key) => JSON.stringify({...mockLocalStorage,
      theme: Theme.dark});
    const { findByTestId } = render(
      <MyAppContext.Provider value={getMockContext()}>
        <Widget key={uuid()} widgetLocation={getMockContext().locations[0]}/>
      </MyAppContext.Provider>);
      const widgetRoot = await findByTestId("widget-root");
      expect(widgetRoot).toHaveClass("widget-dark");
  });
  
  test('toggle switch to test theme', async () =>{
    const { findByTestId } = render(<App />);
    const switcher = await findByTestId("mode-switch");
    fireEvent.change(switcher);
    const appRoot = await findByTestId("app-widget-root");
    await waitFor(() => {
      expect(appRoot).toHaveClass("root-dark");
    });
  });

  test('forecast display by farenheit', async () =>{
    const { findByTestId } = render(
      <MyAppContext.Provider value={getMockContext()}>
        <ForecastWeather onSort={jest.fn()} onUnitChange={jest.fn()}
            isHeader={true} selectedSortMode={SORT_MODE.ASC}
            selectedUnit={TEMP_DISPLAY_UNIT.CELSIUS}
            forecast={getMockForecast()}/>
      </MyAppContext.Provider>);
      const radioFarenheit = await findByTestId("radio-farenheit");
      fireEvent.change(radioFarenheit);
      expect(radioFarenheit).toBeInTheDocument();
  });
});

