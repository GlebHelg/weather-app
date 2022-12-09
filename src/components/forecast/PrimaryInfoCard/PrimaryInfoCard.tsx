import React from 'react';
import style from "./Forecast.module.css"

interface IPrimaryInfoCardProps {
    name: string;
    temp: string;
}

const PrimaryInfoCard = ({name, temp}: IPrimaryInfoCardProps) => {
    return (<>
        <p className={style.dasboardBtn}>{name}</p>
        <p className={style.dasboardBtn}>{temp}</p>
    </>);
}

export default PrimaryInfoCard;