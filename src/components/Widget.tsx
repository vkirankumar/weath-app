import React, { useContext, useEffect, useState } from 'react';
import { ApiMethods, AppContext, Forecast, Location, SORT_MODE, TEMP_DISPLAY_UNIT, Theme, WeatherData } from '../common/types';
import { MyAppContext, sortForecast, translate } from '../common/utils';
import { getData } from '../service/data-services';
import WeatherCell from './WeatherCell';
import ForecastWeather from './ForecastWeather';
import './styles/Widget.css';
import './styles/Assets.css';

export type WidgetProps = {
    widgetLocation: Location,
}

const Widget = (props: WidgetProps) => {

    const appContext:AppContext = useContext(MyAppContext);
    const [dataProvider, setDataProvider] = useState<WeatherData | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<TEMP_DISPLAY_UNIT>(TEMP_DISPLAY_UNIT.CELSIUS);
    const [selectedSortMode, setSelectedSort] = useState<SORT_MODE>(SORT_MODE.ASC);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        getWeatherData();
    }, []);
  
    const getWeatherData = (): void => {
      getData(appContext.dataSourceType, props.widgetLocation.name, ApiMethods.FORECAST)
      .then(response => {
        setDataProvider(translate(appContext.dataSourceType, response.data));
      })
      .catch(error => {
        const message = error?.response?.data?.error?.message ??
            `${error.code} - ${error.message}`
        setErrorMessage(message);
      });  
    }

    const removeWidget = () => {
       appContext.removeLocation(props.widgetLocation);
    }

    const onSort = (sortMode: SORT_MODE) => {
        setSelectedSort(sortMode);
        setDataProvider({...dataProvider, 
            forecast: sortForecast(sortMode, dataProvider?.forecast) });
    }

    const onUnitChange = (unit: TEMP_DISPLAY_UNIT) => {
        setSelectedUnit(unit);
    }

    return (
        <div data-testid="widget-root" className={`widget-root ${appContext.theme === Theme.light ?
            'widget-light' : 'widget-dark'}`}>
            <div className="widget-title">
                <span className={`widget-title-text 
                    ${appContext.theme === Theme.dark ? "text-dark" : ""}`}>
                        {dataProvider?.location?.name}</span>
                <span className="widget-close icon-xsmall close" onClick={removeWidget}></span>
            </div>
            {
                errorMessage.length === 0 ?
                <div className="widget-content">
                <div className="current-top">
                    <WeatherCell weather={dataProvider?.current} 
                         selectedUnit={selectedUnit}/>
                </div>
                <div data-testid="forecast-range" className="current-bottom">
                    {
                        dataProvider?.forecast ?
                        <ForecastWeather isHeader={true}
                            selectedSortMode={selectedSortMode}
                            selectedUnit={selectedUnit}
                            onSort={onSort} 
                            onUnitChange={onUnitChange}/> : <></>
                    }                    
                    {
                        dataProvider?.forecast?.map((forecast: Forecast) => (
                            <ForecastWeather key={forecast.id} forecast={forecast}
                                selectedSortMode={selectedSortMode}
                                selectedUnit={selectedUnit}
                                onSort={onSort} 
                                onUnitChange={onUnitChange} />
                        ))
                    }
                </div>
            </div> : 
            <div className="widget-error-content">
                <div data-testid="widget-fetch-error" className="error icon-large"></div>
                <span>{errorMessage}</span>
            </div>
        }
        </div>
    );
}

export default Widget;