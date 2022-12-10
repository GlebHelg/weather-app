import React from 'react';
import style from "./Forecast.module.css"

import { IWeatherForecast } from '../../common/interfaces';

interface IForecastProps {
    forecastObj: IWeatherForecast;
    selectForecast: React.Dispatch<React.SetStateAction<number | null>>;
}

const Forecast = ({forecastObj, selectForecast}: IForecastProps) => {

    const sunriseDO = new Date(forecastObj.city.sunrise * 1000);
    const sunsetDO  = new Date(forecastObj.city.sunset * 1000);

    const cityName   = forecastObj.city.name
    
    let outlook    = forecastObj.list[0].weather[0].description
    outlook        = outlook[0].toUpperCase()+outlook.slice(1)

    const temp       = forecastObj.list[0].main.temp
    const tempH      = forecastObj.list[0].main.temp_max
    const tempL      = forecastObj.list[0].main.temp_min
    const sunriseHHMM   = [0, 1].map(x => sunriseDO.toTimeString().split(':')[x]).join(':')
    const sunsetHHMM     = [0, 1].map(x => sunsetDO.toTimeString().split(':')[x]).join(':')
    const humidityPrct   = forecastObj.list[0].main.humidity // %
    const visibilityKm = (forecastObj.list[0].visibility / 1000) // Km


    const unit = "°K";
    // +" "+style.forecastHeaderArrow

    return (<>
        <div className={style.forecastHeader}>
            <div className={style.forecastHeaderElem +" "+style.forecastHeaderArrowWrap}>
                <button className={style.forecastHeaderBtn} onClick={() => selectForecast(null)}>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <defs></defs>
                        <title/><g id="arrow-left">
                            <line className="cls-1" x1="3" x2="29" y1="16" y2="16"/>
                            <line className="cls-1" x1="3" x2="7" y1="16" y2="11"/>
                            <line className="cls-1" x1="3" x2="7" y1="16" y2="21"/></g>
                    </svg>
                </button>
            </div>
            <h1 className={style.forecastHeaderElem+" "+style.forecastHeaderText}>{cityName}</h1>
            <div  />
        </div>

        <div className={style.forecastMainSection}>
            <div className={style.primaryInfoCard}>
                <span className={style.primaryInfoCardTop}>{outlook}</span>
                <span className={style.primaryInfoCardCenter}>{temp}{unit}</span>
                <div className={style.primaryInfoCardBottom}>
                    <span className={""}>H: {tempH}</span>
                    <span className={""}>L: {tempL}</span>
                </div>
            </div>
            <div className={style.secondaryInfoCard}>
                <div className={style.sicElement}>
                    <span>Sunrise</span>
                    <span>{sunriseHHMM}</span>
                </div>
                <div className={style.sicElement}>
                    <span>Sunset</span>
                    <span>{sunsetHHMM}</span>
                </div>
                <div className={style.sicElement}>
                    <span>Humidity</span>
                    <span>{humidityPrct}%</span>
                </div>
                <div className={style.sicElement}>
                    <span>Visibility</span>
                    <span>{visibilityKm} Km</span>
                </div>
            </div>
        </div>


    </>);
}

export default Forecast;