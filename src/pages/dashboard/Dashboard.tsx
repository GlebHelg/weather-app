import React from 'react';
import style from "./Dashboard.module.css"
import { IDashboardBtnObj } from './dashboardInterfaces';

import DashboardBtn from '../../components/dashboard/DashboardBtn/DashboardBtn';
import { ILookupCities } from '../../common/interfaces';
import { tempUnitType } from '../../common/utils';

interface IDashboardProps{
    tempUnit: tempUnitType;
    setTempUnit: React.Dispatch<React.SetStateAction<tempUnitType>>;
    dashboardBtnObjs: IDashboardBtnObj[];
    co: {
        citiesToLookup: ILookupCities[], 
        setCitiesToLookup: React.Dispatch<React.SetStateAction<ILookupCities[]>>
    }
}

const Dashboard = ({dashboardBtnObjs, co, tempUnit, setTempUnit}: IDashboardProps) => {
    
    return (<>
        <div className={style.dashboardHeader}>
            <h1>Dashboard</h1>
        </div>
        <div className={style.dashboardBtns}>
            {dashboardBtnObjs.map((btnObj, idx) => <DashboardBtn key={idx+"dash_btn"} dashboardBtnObj={btnObj} tempUnit={tempUnit} co={co}/> )}
        </div>
        <div className={style.formDiv}>
            <div className={style.formDivCity}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    const city = (document.getElementById('add-city-input') as any).value;
                    co.setCitiesToLookup([...co.citiesToLookup, {city: city ?? '', country: ''}])
                    }}>
                    <input className={""}
                                type={"text"} 
                                id={"add-city-input"} 
                                defaultValue={"Rome"}/>
                    <input className={style.formSubmitBtn}
                                type={"submit"} 
                                id={"submit"} 
                                value={"Add City"}/>
                </form>
            </div>
            <div className={style.formDivCity}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        const unit = (document.getElementById('temp-unit-select') as any).value;
                        setTempUnit(unit);
                    }}>
                    <select id="temp-unit-select">
                        <option>K</option>
                        <option>C</option>
                        <option>F</option>
                    </select>
                    <input className={style.formSubmitBtn} type="submit" value="Set Unit"/>
                </form>
            </div>
        </div>
    </>);
}

export default Dashboard;