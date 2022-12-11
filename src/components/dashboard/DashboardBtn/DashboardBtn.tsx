import React from 'react';
import { IDashboardBtnObj } from '../../../pages/dashboard/dashboardInterfaces';
import style from "./DashboardBtn.module.css"

interface IDashboardBtnProps {
    dashboardBtnObj: IDashboardBtnObj;
}

const DashboardBtn = ({dashboardBtnObj}: IDashboardBtnProps) => {
    const dbo = dashboardBtnObj;
    return (<>
        <button className={style.dasboardBtn} onClick={() => dbo.action(dbo.cityId)}>
            <span>{dbo.cityName}</span>
            <span>{dbo.currentTempK}</span>
        </button>
    </>);
}

export default DashboardBtn;