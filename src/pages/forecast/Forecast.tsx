import React from 'react';
import style from "./Forecast.module.css"

import { IWeatherForecast } from '../../common/interfaces';

interface IForecastProps {
    forecastObj: IWeatherForecast | undefined;
    selectForecast: React.Dispatch<React.SetStateAction<number | null>>;
}

const Forecast = ({forecastObj, selectForecast}: IForecastProps) => {
    return (<>
        <button className={style.dasboardBtn} onClick={() => selectForecast(null)}>←</button>
        <p className={style.dasboardBtn}>{JSON.stringify(forecastObj)}</p>
    </>);
}

export default Forecast;