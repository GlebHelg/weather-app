import React from 'react';
import style from "./Dashboard.module.css"
import { IDashboardBtnObj } from './dashboardInterfaces';

import DashboardBtn from '../../components/dashboard/DashboardBtn/DashboardBtn';
import { ILookupCities } from '../../common/interfaces';

interface IDashboardProps{
    dashboardBtnObjs: IDashboardBtnObj[];
    citiesToLookup: {
        citiesToLookup: ILookupCities[], 
        setCitiesToLookup: React.Dispatch<React.SetStateAction<ILookupCities[]>>
    }
}

const Dashboard = ({dashboardBtnObjs, citiesToLookup}: IDashboardProps) => {

    // const presentationButtons = dashboardBtnObjs.map(x => <button key={x.cityId} className={style.dasboardBtn} onClick={() => selectForecast(x.cityId)}>{x.cityName} {x.currentTempK}</button>)
    // console.log('presentationButtons: ', presentationButtons);
    
    return (<>
        <div className={style.dashboardHeader}>
            <h1>Dashboard</h1>
        </div>
        <div className={style.dashboardBtns}>
            {dashboardBtnObjs.map((btnObj, idx) => <DashboardBtn key={idx+"dash_btn"} dashboardBtnObj={btnObj}/> )}
        </div>
        <div className={style.formDiv}>
            <form onSubmit={(e) => {
                e.preventDefault()
                //console.log(e.target[0].value)
                const city = (document.getElementById('add-another-city') as any).value;
                citiesToLookup.setCitiesToLookup([...citiesToLookup.citiesToLookup, {city: city ?? '', country: ''}])
                }}>
                <input className={""}
                              type={"text"} 
                              id={"add-another-city"} 
                              defaultValue={"Rome"}/>
                <input className={""}
                              type={"submit"} 
                              id={"submit"} 
                              value={"Add city"}/>
            </form>
        </div>
    </>);
}

export default Dashboard;