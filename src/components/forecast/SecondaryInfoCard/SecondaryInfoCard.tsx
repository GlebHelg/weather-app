import React from 'react';
import style from "./Forecast.module.css"

interface ISecondaryInfoCardProps {
    name: string;
    temp: string;
}

const SecondaryInfoCard = ({name, temp}: ISecondaryInfoCardProps) => {
    return (<>
        <p className={style.dasboardBtn}>{name}</p>
        <p className={style.dasboardBtn}>{temp}</p>
    </>);
}

export default SecondaryInfoCard;