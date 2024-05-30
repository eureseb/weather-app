import './App.css';
import { React, useEffect, useState } from 'react';


function App() {
  const [weatherData, setWeatherData] = useState({temperature: 0, currentWeather: "", mostLikelyFallout: "", falloutChance: 0.0 });

  useEffect(() => {
    fetchWeatherData();
  }, []);
  async function fetchWeatherData() {
    let weatherData = await fetch("http://localhost/temperature/poll");
    weatherData = await weatherData.json();
    let precipitationData = await fetch("http://localhost/precipitation/latest?temperature=" + weatherData.temperature);
    precipitationData = await precipitationData.json();
    setWeatherData({
      temperature: weatherData.temperature,
      currentWeather: precipitationData.currentWeather,
      mostLikelyfallout: precipitationData.mostLikelyFallout,
      falloutChance: precipitationData.falloutChance
    });
  }
  return (
    <div className="App">
      <h1>Weather Report App</h1>
      <p>Temperature: {weatherData.temperature}°C</p>
      <p>Current Weather: {weatherData.currentWeather}</p>
      <p>Most Likely Fallout: {weatherData.mostLikelyFallout}</p>
      <p>Fallout Chance: {weatherData.falloutChance}%</p>
    </div>
  );
}

export default App;
