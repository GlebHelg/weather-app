export const getHHMMFromDate = (date: Date) => {
    return [0, 1].map(x => date.toTimeString().split(':')[x]).join(':')
}

export const kelvinToCelsius = (temp: number) => {
    return Math.round(temp - 273.15);
}

export const kelvinToFahrenheit = (temp: number) => {
    return Math.round(temp * (9/5) - 459.67);
}

export type tempUnitType = "K" | "C" | "F";
export const convertTempToUnit = (temp: number, unit: tempUnitType) => {
    switch(unit){
        case "K":
            return temp
        case "C":
            return kelvinToCelsius(temp)
        case "F":
            return kelvinToFahrenheit(temp)
    }
}