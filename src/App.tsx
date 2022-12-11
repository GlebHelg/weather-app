import React, {useState, useMemo} from 'react';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Forecast from './pages/forecast/Forecast';

import {ILookupCities, IGeoLocCities, IWeatherForecast} from './common/interfaces';
import { IDashboardBtnObj } from './pages/dashboard/dashboardInterfaces';
import { tempUnitType } from './common/utils';

const getCityGeoLocPromise = (co: any) => {
  return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${co.city}&limit=1&appid=3683c0f2ebd11c8063d6f9d995541a8e`);
}

const resolveAndSetGeoLocCities = (citiesSearchPromises: Promise<Response>[], setGeoLocCities: React.Dispatch<React.SetStateAction<IGeoLocCities[]>>) => {
  Promise.all(citiesSearchPromises)
        .then(responses => {
          return Promise.all(responses.map(resp => resp.text()))
        })
        .then((respTextArr:string[]) => {
          setGeoLocCities(respTextArr.map(respTextElem => JSON.parse(respTextElem)[0] )) 
        });
}

const getForecastPromise = (glco: any) => {
  const queryString = `http://api.openweathermap.org/data/2.5/forecast?lat=${glco.lat}&lon=${glco.lon}&appid=3683c0f2ebd11c8063d6f9d995541a8e`
  return fetch(queryString);
}

const resolveAndSetWeatherForecasts = (citiesSearchPromises: Promise<Response>[], setWeatherForecasts: React.Dispatch<React.SetStateAction<IWeatherForecast[]>>) => {
  Promise.all(citiesSearchPromises)
        .then(responses => {
          return Promise.all(responses.map(resp => resp.text()))
        })
        .then((respTextArr:string[]) => {
          setWeatherForecasts(respTextArr.map(respTextElem => JSON.parse(respTextElem) )) 
        });
}


function App() {
  const [selectedForecast, setSelectedForecast] = useState<number | null>(null);
  
  const [currentPosition, setCurrentPosition] = useState<IGeoLocCities | null>(null)

  const getLocation = () => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      return "Geolocation is not supported by this browser.";
    }
  }
  const showPosition = (position: any) => {
    setCurrentPosition({name: "My Location",lat: position.coords.latitude, lon: position.coords.longitude})
  }
  useMemo(() => {getLocation()}, [JSON.stringify(currentPosition)])
  //console.log('currentPosition: ', currentPosition);

  // made like object due to assumption that country code can be sent to API
  const [citiesToLookup, setCitiesToLookup] = useState<ILookupCities[]>([
    {
      city: 'Berlin',
      country: 'DE'
    },
    {
      city: 'London',
      country: 'GB'
    },
    {
      city: 'Oslo',
      country: 'GB'
    }
  ]);

  // fetch states 
  const [geoLocCities, setGeoLocCities] = useState<IGeoLocCities[]>([]);
  //console.log('geoLocCities: ', geoLocCities)
  const [weatherForecasts, setWeatherForecasts] = useState<IWeatherForecast[]>([]);
  //console.log('weatherForecasts: ', weatherForecasts)

  // Geo Loc
  useMemo(() => {
    const citiesSearchPromises = citiesToLookup.map(co => getCityGeoLocPromise(co))
    resolveAndSetGeoLocCities(citiesSearchPromises, setGeoLocCities)
  }
  , [JSON.stringify(citiesToLookup)])// JSON.stringify should be improved

  // Weather Forecast
  useMemo(() => {
    let geoLocCitiesMod = [];
    if(currentPosition){
      geoLocCitiesMod = [...geoLocCities, currentPosition]
    }
    else{
      geoLocCitiesMod = [...geoLocCities]
    }
    const forecastSearchPromises = geoLocCitiesMod.map(glco => getForecastPromise(glco))
    resolveAndSetWeatherForecasts(forecastSearchPromises, setWeatherForecasts)
  }
  , [JSON.stringify(geoLocCities)])// JSON.stringify should be improved

  const dashboardBtnObjs: IDashboardBtnObj[] = weatherForecasts.map(x => {
    return {
            cityId: x.city.id, 
            cityName: x.city.name,
            currentTempK: x.list[0].main.temp,
            action: setSelectedForecast
          }
  })
  //console.log('dashboardBtnObjs: ', dashboardBtnObjs);

  const forecastObj: IWeatherForecast | undefined = weatherForecasts.find(x => x.city.id === selectedForecast)

  const [tempUnit, setTempUnit] = useState<tempUnitType>("K")

  return (
    <>
      {
      selectedForecast ? 
        <Forecast tempUnit={tempUnit} forecastObj={forecastObj as IWeatherForecast} selectForecast={setSelectedForecast}/> :
        <Dashboard tempUnit={tempUnit} setTempUnit={setTempUnit} dashboardBtnObjs={dashboardBtnObjs} citiesToLookup={{citiesToLookup, setCitiesToLookup}}/>
      }
    </>
  );
}

export default App;
