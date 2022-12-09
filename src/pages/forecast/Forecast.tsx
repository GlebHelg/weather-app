import React from 'react';
import style from "./Forecast.module.css"

interface IForecastProps {
    name: string;
    temp: string;
}

const Forecast = ({name, temp}: IForecastProps) => {
    return (<>
        <p className={style.dasboardBtn}>{name}</p>
        <p className={style.dasboardBtn}>{temp}</p>
    </>);
}

export default Forecast;