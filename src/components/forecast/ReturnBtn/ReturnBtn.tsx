import React from 'react';
import style from "./ReturnBtn.module.css"

interface IReturnBtnProps {
    name: string;
    temp: string;
}

const ReturnBtn = ({name, temp}: IReturnBtnProps) => {
    return (<>
        <p className={style.dasboardBtn}>{name}</p>
        <p className={style.dasboardBtn}>{temp}</p>
    </>);
}

export default ReturnBtn;