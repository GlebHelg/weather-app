import React from 'react';
import style from "./Dashboard.module.css"
import { IDashboardBtnObj } from './dashboardInterfaces';

interface IDashboardProps{
    dashboardBtnObjs: IDashboardBtnObj[];
    selectForecast: React.Dispatch<React.SetStateAction<number | null>>
}

const Dashboard = ({dashboardBtnObjs, selectForecast}: IDashboardProps) => {

    const presentationButtons = dashboardBtnObjs.map(x => <button key={x.cityId} className={style.dasboardBtn} onClick={() => selectForecast(x.cityId)}>{x.cityName} {x.currentTempK}</button>)
    console.log('presentationButtons: ', presentationButtons);
    
    return (<>
        {presentationButtons}
    </>);
}

export default Dashboard;