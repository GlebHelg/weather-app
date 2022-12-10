import React from 'react';
import style from "./PrimaryInfoCard.module.css"

interface IPrimaryInfoCardProps {
    outlookText: string,
    temp: {value: number, unit: string},
    tempH: {value: number, unit: string},
    tempL: {value: number, unit: string}
}

const PrimaryInfoCard = ({outlookText, temp, tempH, tempL}: IPrimaryInfoCardProps) => {
    return (<>
        
        <div className={style.primaryInfoCard}>
                <span className={style.primaryInfoCardTop}>{outlookText}</span>
                <span className={style.primaryInfoCardCenter}>{temp.value}°{temp.unit}</span>
                <div className={style.primaryInfoCardBottom}>
                    <span className={""}>H: {tempH.value}°{temp.unit}</span>
                    <span className={""}>L: {tempL.value}°{temp.unit}</span>
                </div>
            </div>
    </>);
}

export default PrimaryInfoCard;