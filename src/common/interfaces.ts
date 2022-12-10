export interface ILookupCities {
    city: string;
    country: string;
}
  
export interface IGeoLocCities {
    name: string;
    lat: number;
    lon: number;
} 
  
export interface IWeatherForecast{
    city: IWeatherForecastCity;
    cnt: number;
    list: IWeatherForecastListElem;
  
}
  
interface IWeatherForecastCity{
    coord: {lat: number; lon: number;};
    country: string;
    id: number;
    name: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;  
}
  
interface IWeatherForecastListElem{
    dt: number,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        sea_level: number,
        grnd_level: number,
        humidity: number,
        temp_kf: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    clouds: {
        all: number
    },
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    visibility: number,
    pop: number,
    sys: {
        pod: string
    },
    dt_txt: string
}