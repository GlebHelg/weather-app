import React from 'react';
import style from "./SicElement.module.css"

interface ISicElementProps {
    title: string;
    value: string;
}

const SicElement = ({title, value}: ISicElementProps) => {
    return (<>
        <div className={style.sicElement}>
            <span>{title}</span>
            <span>{value}</span>
        </div>
    </>);
}

export default SicElement;