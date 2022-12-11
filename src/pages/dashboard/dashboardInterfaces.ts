export interface IDashboardBtnObj {
    cityId: number; 
    cityName: string;
    currentTempK: number;
    action(val: any):any;
}