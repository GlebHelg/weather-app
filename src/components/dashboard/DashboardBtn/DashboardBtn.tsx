import React from 'react';
import { convertTempToUnit, tempUnitType } from '../../../common/utils';
import { IDashboardBtnObj } from '../../../pages/dashboard/dashboardInterfaces';
import style from "./DashboardBtn.module.css"

interface IDashboardBtnProps {
    tempUnit: tempUnitType;
    dashboardBtnObj: IDashboardBtnObj;
}

const DashboardBtn = ({dashboardBtnObj, tempUnit}: IDashboardBtnProps) => {
    const dbo = dashboardBtnObj;
    return (<>
        <button className={style.dasboardBtn} onClick={() => dbo.action(dbo.cityId)}>
            <span>{dbo.cityName}</span>
            <span>{convertTempToUnit(dbo.currentTempK, tempUnit)}°{tempUnit}</span>
        </button>
    </>);
}

export default DashboardBtn;