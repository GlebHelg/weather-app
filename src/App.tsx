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

const validateGeoLocResp = (jsonResp: any[], citiesToLookup: ILookupCities[], setCitiesToLookup: React.Dispatch<React.SetStateAction<ILookupCities[]>>) => {
  let invaliIdx: number | null = null;
  if(jsonResp.length === citiesToLookup.length){
    citiesToLookup.forEach((city, idx) => {
      if(!jsonResp.find(x => x?.name === city.city)){
        alert('No result found for '+city.city+'.')
        invaliIdx = idx;
      }
    })
  }
  else{
    invaliIdx = Number.MAX_SAFE_INTEGER;
  }
  if(invaliIdx) {
    citiesToLookup.splice(invaliIdx, 1)
    localStorage.setItem("citiesToLookup", JSON.stringify(citiesToLookup))
    setCitiesToLookup(citiesToLookup)
    return 0; // Some sort of error handling. Could be something with new Error
  }
  else{
    return 1;
  }
}

const resolveAndSetGeoLocCities = (citiesSearchPromises: Promise<Response>[], 
                                  setGeoLocCities: React.Dispatch<React.SetStateAction<IGeoLocCities[]>>,
                                  citiesToLookup: ILookupCities[], 
                                  setCitiesToLookup: React.Dispatch<React.SetStateAction<ILookupCities[]>>) => {
  Promise.all(citiesSearchPromises)
        .then(responses => {
          return Promise.all(responses.map(resp => resp.text()))
        })
        .then((respTextArr:string[]) => {
          const jsonResp = respTextArr.map(respTextElem => JSON.parse(respTextElem)[0])
          const validResponse = validateGeoLocResp(jsonResp, citiesToLookup, setCitiesToLookup)
          if(validResponse){
            setGeoLocCities(jsonResp) 
          }
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

const getLookupCitiesFromLocal = () => {
  if(localStorage["citiesToLookup"] && localStorage["citiesToLookup"] !== '[]'){
    return JSON.parse(localStorage["citiesToLookup"])
  }
  else{
    return [
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
    ];
  }
}

const syncCityNames = (geoLocCities:IGeoLocCities[], 
                       weatherForecasts:IWeatherForecast[] ) => {
      
      geoLocCities.forEach(glc => {
        if(glc){
          const weatherForecastObj = weatherForecasts.find(wf => wf.city.coord.lat === Number(glc.lat.toFixed(3)))
          if(weatherForecastObj) weatherForecastObj.city.name = glc.name;                  
        }
      })
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
    setCurrentPosition({name: "My Location", lat: position.coords.latitude, lon: position.coords.longitude})
  }
  useMemo(() => {getLocation()}, [JSON.stringify(currentPosition)])

  // made like object due to assumption that country code can be sent to API
  const [citiesToLookup, setCitiesToLookup] = useState<ILookupCities[]>(getLookupCitiesFromLocal());
  localStorage.setItem("citiesToLookup", JSON.stringify(citiesToLookup))


  // fetch states 
  const [geoLocCities, setGeoLocCities] = useState<IGeoLocCities[]>([]);
  const [weatherForecasts, setWeatherForecasts] = useState<IWeatherForecast[]>([]);

  syncCityNames(geoLocCities, weatherForecasts);

  // Geo Loc
  useMemo(() => {
    const citiesSearchPromises = citiesToLookup.map(co => getCityGeoLocPromise(co))
    resolveAndSetGeoLocCities(citiesSearchPromises, setGeoLocCities, citiesToLookup, setCitiesToLookup)
  }
  , [JSON.stringify(citiesToLookup)])// JSON.stringify should be improved

  // Weather Forecast
  useMemo(() => {
    JSON.stringify(geoLocCities)
    //debugger
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

  const forecastObj: IWeatherForecast | undefined = weatherForecasts.find(x => x.city.id === selectedForecast)

  const [tempUnit, setTempUnit] = useState<tempUnitType>("K")

  return (
    <>
      {
      selectedForecast ? 
        <Forecast tempUnit={tempUnit} forecastObj={forecastObj as IWeatherForecast} selectForecast={setSelectedForecast}/> :
        dashboardBtnObjs ? <Dashboard tempUnit={tempUnit} setTempUnit={setTempUnit} dashboardBtnObjs={dashboardBtnObjs} co={{citiesToLookup, setCitiesToLookup}} /> :
        <span>Spinner</span>
      }
    </>
  );
}

export default App;
