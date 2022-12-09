import React, {useState, useMemo} from 'react';
import './App.css';
import DashboardBtn from './components/dashboard/DashboardBtn/DashboardBtn';
import Dashboard from './pages/dashboard/Dashboard';
import Forecast from './pages/forecast/Forecast';



const getCityGeoLocPromise = (co: any) => {
  return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${co.city}&limit=1&appid=3683c0f2ebd11c8063d6f9d995541a8e`);
}

const resolveAndSetGeoLocCities = (citiesSearchPromises: any[], setGeoLocCities: any) => {
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
  console.log('queryString: ', queryString)
  return fetch(queryString);
}

const resolveAndSetWeatherForecasts = (citiesSearchPromises: any[], setGeoLocCities: any) => {
  Promise.all(citiesSearchPromises)
        .then(responses => {
          return Promise.all(responses.map(resp => resp.text()))
        })
        .then((respTextArr:string[]) => {
          console.log('respTextArr: ', respTextArr)
          setGeoLocCities(respTextArr.map(respTextElem => JSON.parse(respTextElem) )) 
        });
}


function App() {
  const [allForecasts, setAllForecasts] = useState(null);
  const [selectedForecast, setSelectedForecast] = useState(null);


  const [citiesToLookup, setCitiesToLookup] = useState([
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

  // fetchStates
  const [geoLocCities, setGeoLocCities] = useState([]);
  console.log('geoLocCities: ', geoLocCities)
  const [weatherForecasts, setWeatherForecasts] = useState([]);
  console.log('weatherForecasts: ', weatherForecasts)

  // Geo Loc
  useMemo(() => {
    const citiesSearchPromises = citiesToLookup.map(co => getCityGeoLocPromise(co))
    resolveAndSetGeoLocCities(citiesSearchPromises, setGeoLocCities)
  }
  , [JSON.stringify(citiesToLookup)])// JSON.stringify should be improved

  // Weather Forecast
  useMemo(() => {
    const forecastSearchPromises = geoLocCities.map(glco => getForecastPromise(glco))
    resolveAndSetWeatherForecasts(forecastSearchPromises, setWeatherForecasts)
  }
  , [JSON.stringify(geoLocCities)])// JSON.stringify should be improved

  



  return (
    <>
      {
      selectedForecast ? 
        <Forecast name={"Berlin"} temp={"12C"} /> :
        <Dashboard name={"Berlini"} temp={"12C"}/>
      }
    </>
  );
}

export default App;
