import React from 'react';
import style from "./Forecast.module.css"

import { IWeatherForecast } from '../../common/interfaces';
import SecondaryInfoCard from '../../components/forecast/SecondaryInfoCard/SecondaryInfoCard';
import PrimaryInfoCard from '../../components/forecast/PrimaryInfoCard/PrimaryInfoCard';
import { convertTempToUnit, getHHMMFromDate, tempUnitType } from '../../common/utils';

interface IForecastProps {
    tempUnit: tempUnitType;
    forecastObj: IWeatherForecast;
    selectForecast: React.Dispatch<React.SetStateAction<number | null>>;
}

const Forecast = ({forecastObj, selectForecast, tempUnit}: IForecastProps) => {

    const sunriseDO = new Date(forecastObj.city.sunrise * 1000);
    const sunsetDO  = new Date(forecastObj.city.sunset * 1000);

    const cityName   = forecastObj.city.name
    
    // For PrimaryInfoCard
    let outlook    = forecastObj.list[0].weather[0].description
    outlook        = outlook[0].toUpperCase()+outlook.slice(1)
    
    const outlookText = outlook;
    const temp        = {value: convertTempToUnit(forecastObj.list[0].main.temp, tempUnit), unit: tempUnit};
    const tempH       = {value: convertTempToUnit(forecastObj.list[0].main.temp_max, tempUnit), unit: tempUnit};
    const tempL       = {value: convertTempToUnit(forecastObj.list[0].main.temp_min, tempUnit), unit: tempUnit};

    // For SecondaryInfoCard
    const sicObjects = [
        {
            title: "Sunrise",
            value: getHHMMFromDate(sunriseDO)
        },
        {
            title: "Sunset",
            value: getHHMMFromDate(sunsetDO)
        },
        {
            title: "Humidity",
            value: forecastObj.list[0].main.humidity+" %"
        },
        {
            title: "Visibility",
            value: (forecastObj.list[0].visibility / 1000) + " Km"
        }
    ]

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
            <PrimaryInfoCard    outlookText={outlookText}
                                temp={temp}
                                tempH={tempH}
                                tempL={tempL}
                                />

            <SecondaryInfoCard sicObjects={sicObjects}/>
        </div>


    </>);
}

export default Forecast;