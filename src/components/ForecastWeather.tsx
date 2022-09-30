import React, { useContext, useState } from "react";
import { AppContext, Forecast, SORT_MODE, TEMP_DISPLAY_UNIT, Theme } from "../common/types";
import { convertDateToText, getImageByCondition, MyAppContext } from "../common/utils";
import "./styles/ForecastWeather.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

type ForecastProps = {
    forecast?: Forecast,
    isHeader?: boolean,
    selectedUnit: TEMP_DISPLAY_UNIT,
    selectedSortMode: SORT_MODE,
    onSort: (sortMode: SORT_MODE) => void,
    onUnitChange: (unit: TEMP_DISPLAY_UNIT) => void
}

const ForecastWeather = (props: ForecastProps): JSX.Element => {

    const [unit, setUnit] = useState<TEMP_DISPLAY_UNIT>(TEMP_DISPLAY_UNIT.CELSIUS);
    const [sortMode, setSortMode] = useState<SORT_MODE>(SORT_MODE.ASC);
    const appContext: AppContext = useContext(MyAppContext);

    return (
        <>
            {props.isHeader ?
            <div data-testid="forecast-filter" className="weather-display-filter">                
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label"
                        className={`sort-header-font ${appContext.theme === Theme.dark ?
                            "sort-header-text" : ""}`}>Date</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value={SORT_MODE.ASC} control={<Radio size="small"/>} 
                            label={SORT_MODE.ASC} checked={sortMode === SORT_MODE.ASC}
                            onChange={() => {
                                setSortMode(SORT_MODE.ASC);
                                props.onSort(SORT_MODE.ASC);
                            }}/>
                        <FormControlLabel value={SORT_MODE.DESC} control={<Radio size="small"/>} 
                            label={SORT_MODE.DESC} checked={sortMode === SORT_MODE.DESC}
                            onChange={() => {
                                setSortMode(SORT_MODE.DESC);
                                props.onSort(SORT_MODE.DESC);
                            }}/>
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label"
                        className={`sort-header-font ${appContext.theme === Theme.dark ?
                            "sort-header-text" : ""}`}>Temperature</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group">
                        <FormControlLabel data-testid="radio-celsius"
                            value={TEMP_DISPLAY_UNIT.CELSIUS} 
                            control={<Radio size="small" />} 
                            label={`${TEMP_DISPLAY_UNIT.CELSIUS}°`} 
                            checked={unit === TEMP_DISPLAY_UNIT.CELSIUS}
                            onChange={ () => {
                                setUnit(TEMP_DISPLAY_UNIT.CELSIUS);
                                props.onUnitChange(TEMP_DISPLAY_UNIT.CELSIUS);
                            }}/>
                        <FormControlLabel data-testid="radio-farenheit"
                            value={TEMP_DISPLAY_UNIT.FARENHEIT} 
                            control={<Radio size="small" />} 
                            label={`${TEMP_DISPLAY_UNIT.FARENHEIT}°`}
                            checked={unit === TEMP_DISPLAY_UNIT.FARENHEIT}
                            onChange={ () => {
                                setUnit(TEMP_DISPLAY_UNIT.FARENHEIT);
                                props.onUnitChange(TEMP_DISPLAY_UNIT.FARENHEIT);
                            }}/>
                    </RadioGroup>
                </FormControl>
            </div> :
            <div data-testid="forecast-widget" className="weather-display-row">
                <span className="weather-display-cell">{convertDateToText(props.forecast?.day?.date)}</span>
                <div className="weather-display-cell-image">
                    <div data-testid="forecast-current-image" className={`icon-xsmall ${getImageByCondition(props.forecast?.day?.condition)}`}></div>
                    <span>{props.forecast?.day?.text}</span>
                </div> 
                <div className="weather-display-cell-temp">
                    <div className="icon-xxsmall up icon-dropshadow"></div>
                    <span className="temp-display-text">{`${props.selectedUnit === TEMP_DISPLAY_UNIT.CELSIUS ? 
                        props.forecast?.day?.maxTempCel : 
                        props.forecast?.day?.maxTempFar }°`}</span>
                </div>               
                <div className="weather-display-cell-temp">
                    <div className="icon-xxsmall down icon-dropshadow"></div>
                    <span className="temp-display-text">{`${props.selectedUnit === TEMP_DISPLAY_UNIT.CELSIUS ?
                        props.forecast?.day?.minTempCel : 
                        props.forecast?.day?.minTempFar}°`}</span>
                </div>
            </div> }
        </>
    )
}

export default ForecastWeather;