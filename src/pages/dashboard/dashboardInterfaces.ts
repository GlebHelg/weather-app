export interface IDashboardProps{
    dashboardBtnObjs: IDashboardPropElem[];
    selectForecast: React.Dispatch<React.SetStateAction<number | null>>
}

export interface IDashboardPropElem {
    cityId: number; 
    cityName: string;
    currentTempK: number;
}