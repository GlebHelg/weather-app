import React from 'react';
import style from "./DashboardBtn.module.css"

interface IDashboardBtnProps {
    name: string;
    temp: string;
}

const DashboardBtn = ({name, temp}: IDashboardBtnProps) => {
    return (<>
        <p className={style.dasboardBtn}>{name}</p>
        <p className={style.dasboardBtn}>{temp}</p>
    </>);
}

export default DashboardBtn;