import React from 'react';
import style from "./Dashboard.module.css"
import { IDashboardBtnObj } from './dashboardInterfaces';

import DashboardBtn from '../../components/dashboard/DashboardBtn/DashboardBtn';

interface IDashboardProps{
    dashboardBtnObjs: IDashboardBtnObj[];
    selectForecast: React.Dispatch<React.SetStateAction<number | null>>
}

const Dashboard = ({dashboardBtnObjs, selectForecast}: IDashboardProps) => {

    const presentationButtons = dashboardBtnObjs.map(x => <button key={x.cityId} className={style.dasboardBtn} onClick={() => selectForecast(x.cityId)}>{x.cityName} {x.currentTempK}</button>)
    console.log('presentationButtons: ', presentationButtons);
    
    return (<>
        <div className={style.dashboardHeader}>
            <h1>Dashboard</h1>
        </div>
        <div className={style.dashboardBtns}>
            {dashboardBtnObjs.map(btnObj => <DashboardBtn dashboardBtnObj={btnObj} selectForecast={selectForecast}/> )}
        </div>
    </>);
}

export default Dashboard;