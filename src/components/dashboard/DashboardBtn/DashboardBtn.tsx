import React from 'react';
import { IDashboardBtnObj } from '../../../pages/dashboard/dashboardInterfaces';
import style from "./DashboardBtn.module.css"

interface IDashboardBtnProps {
    dashboardBtnObj: IDashboardBtnObj;
    selectForecast: React.Dispatch<React.SetStateAction<number | null>>;
}

const DashboardBtn = ({dashboardBtnObj, selectForecast}: IDashboardBtnProps) => {
    const dbo = dashboardBtnObj;
    return (<>
        <button className={style.dasboardBtn} onClick={() => selectForecast(dbo.cityId)}>
            <span>{dbo.cityName}</span>
            <span>{dbo.currentTempK}</span>
        </button>
    </>);
}

export default DashboardBtn;