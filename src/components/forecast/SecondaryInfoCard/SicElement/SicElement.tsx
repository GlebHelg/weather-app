import React from 'react';
import style from "./SecondaryInfoCardElement.module.css"

interface ISicElementProps {
    name: string;
    temp: string;
}

const SicElement = ({name, temp}: ISicElementProps) => {
    return (<>
        <p className={style.dasboardBtn}>{name}</p>
        <p className={style.dasboardBtn}>{temp}</p>
    </>);
}

export default SicElement;