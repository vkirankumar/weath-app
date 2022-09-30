import moment from "moment";
import React from "react";
import { TEMP_DISPLAY_UNIT, Weather } from "../common/types";
import { getImageByCondition } from "../common/utils";
import "./styles/WeatherCell.css";

type WeatherCellProps = {
    weather?: Weather;
    selectedUnit: TEMP_DISPLAY_UNIT
}

const WeatherCell = (props: WeatherCellProps): JSX.Element => {
    return (
        props.weather ?
        <>          
            <div data-testid="current-weather-container" className="cell-top-left">                
                <div className="cell-current-temp-text">Current Weather</div>
                <div>{moment(props.weather.date).format("LT")}</div>
                <div className="current-temp-container">
                    <div className={`icon-large icon-dropshadow ${
                        getImageByCondition(props.weather?.condition)}`}/>
                    <div className="current-temp-display">
                        {`${props.selectedUnit === TEMP_DISPLAY_UNIT.CELSIUS ?
                            props.weather?.tempCel :
                            props.weather?.tempFar}°`}
                    </div>
                </div>
                <div className="">{props.weather?.text}</div>
            </div>
            <div className="cell-top-right">
                <div className="cell-header-container">
                    <span className="cell-header-text">Feels Like</span>
                    <span className="cell-header-data">{`${
                        props.selectedUnit === TEMP_DISPLAY_UNIT.CELSIUS ? 
                        props.weather?.feelCel : props.weather?.feelFar}° `}</span>
                </div>
                <div className="cell-header-container">
                    <span className="cell-header-text">Humidity</span>
                    <span className="cell-header-data">
                        {`${props.weather?.humidity}%`}</span>
                </div>
                <div className="cell-header-container">
                    <span className="cell-header-text">Wind</span>
                    <span className="cell-header-data">
                        {`${props.weather?.windKPH} km/h`}</span>
                </div>
            </div>
        </> : <></>
    );
}

export default WeatherCell;