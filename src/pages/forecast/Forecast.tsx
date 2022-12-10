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
    const outlook    = forecastObj.list[0].weather[0].description
    const temp       = forecastObj.list[0].main.temp
    const tempH      = forecastObj.list[0].main.temp_max
    const tempL      = forecastObj.list[0].main.temp_min
    const sunrise    = [0, 1].map(x => sunriseDO.toTimeString().split(':')[x]).join(':')
    const sunset     = [0, 1].map(x => sunsetDO.toTimeString().split(':')[x]).join(':')
    const humidity   = forecastObj.list[0].main.humidity
    const visibility = forecastObj.list[0].visibility





    return (<>
        <h3>Forecast</h3>
        <button className={style.dasboardBtn} onClick={() => selectForecast(null)}>←</button>
        <p className={style.dasboardBtn}>City: {cityName}</p>

        <p className={style.dasboardBtn}>Outlook: {outlook}</p>
        <p className={style.dasboardBtn}>Temp: {temp}</p>
        <p className={style.dasboardBtn}>TempH: {tempH}</p>
        <p className={style.dasboardBtn}>TempL: {tempL}</p>

        <p className={style.dasboardBtn}>Sunrise: {sunrise}</p>
        <p className={style.dasboardBtn}>Sunset: {sunset}</p>
        <p className={style.dasboardBtn}>Humidity: {humidity}</p>
        <p className={style.dasboardBtn}>Visibility: {visibility}</p>

    </>);
}

export default Forecast;