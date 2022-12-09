import React from 'react';
import style from "./Dashboard.module.css"

interface IDashboardProps {
    name: string;
    temp: string;
}

const Dashboard = ({name, temp}: IDashboardProps) => {
    return (<>
        <p className={style.dasboardBtn}>{name}</p>
        <p className={style.dasboardBtn}>{temp}</p>
    </>);
}

export default Dashboard;