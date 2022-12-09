import React, {useState} from 'react';
import './App.css';
import DashboardBtn from './components/dashboard/DashboardBtn/DashboardBtn';
import Dashboard from './pages/dashboard/Dashboard';
import Forecast from './pages/forecast/Forecast';


function App() {
  const [allForecasts, setAllForecasts] = useState(null);
  const [selectedForecast, setSelectedForecast] = useState(null);
  
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
