import React from 'react';
import { ILookupCities } from '../../../common/interfaces';
import { convertTempToUnit, tempUnitType } from '../../../common/utils';
import { IDashboardBtnObj } from '../../../pages/dashboard/dashboardInterfaces';
import style from "./DashboardBtn.module.css"

interface IDashboardBtnProps {
    tempUnit: tempUnitType;
    dashboardBtnObj: IDashboardBtnObj;
    co: {
        citiesToLookup: ILookupCities[], 
        setCitiesToLookup: React.Dispatch<React.SetStateAction<ILookupCities[]>>
    }
}



const DashboardBtn = ({dashboardBtnObj, tempUnit, co}: IDashboardBtnProps) => {

    const dbo = dashboardBtnObj;

    const removeLookupCity = () => {
        const idx = co.citiesToLookup.findIndex(x => x.city === dbo.cityName)
        if(idx !== -1){
            co.citiesToLookup.splice(idx, 1)
            co.setCitiesToLookup(co.citiesToLookup)
        }
    }

    return (<>
        <div className={style.dasboardBtnWrapDiv}>
            <button className={style.dasboardBtn} onClick={() => dbo.action(dbo.cityId)}>
                <span>{dbo.cityName}</span>
                <span>{convertTempToUnit(dbo.currentTempK, tempUnit)}°{tempUnit}</span>
            </button>
            <button className={style.dasboardBtnX} 
                    onClick={() => removeLookupCity()} 
                    aria-label="Delete city from dashboard">X</button>
        </div>
    </>);
}

export default DashboardBtn;