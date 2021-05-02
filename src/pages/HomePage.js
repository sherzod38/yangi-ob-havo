import { useState, useEffect } from 'react';
import axios from 'axios';

import CitySwitcher from '../containers/CitySwitcher';

import weatherCodeParse from '../helpers/weatherCodeParse';

const HomePage = () => {

  const [ activeCity, setActiveCity ] = useState('tashkent');
  const [ activeWeather, setActiveWeather ] = useState({
    isFetched: false,
    data: {},
    error: null
  });

  const fetchWeatherInfo = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: activeCity,
        appid: '5ec646c90ce3554cf8cfb59c954c2849',
        units: 'metric'
      }
    })
    .then(function (response) {
      setActiveWeather({
        isFetched: true,
        data: response.data,
        error: false
      })
    })
    .catch(function (error) {
      setActiveWeather({
        isFetched: true,
        data: {},
        error: error
      })
    })
    .then(function () {
      // always executed
    });  
  }

  useEffect(() => {
    fetchWeatherInfo();
  }, [activeCity])

  return (
    <div>
      <CitySwitcher setActiveCity={setActiveCity} activeCity={activeCity}/>
      <div>
        {
          activeWeather.isFetched ? (
            <div className="main-weather">
              <h1>{activeWeather.data.name}</h1>
              <h1>{Math.round(activeWeather.data.main.temp)}° C</h1>
              <img src={weatherCodeParse(activeWeather.data.weather[0].id)} className="weather-icon"/>
              <div>
                {
                  activeWeather.data.weather.map((weather) => (
                    <h1>It's <span className="weather-status">{weather.main}</span> now in <span className="weather-city">{activeWeather.data.name}</span></h1>
                  ))
                }
              </div>
            </div>
          ) : (
            <h1>Loading...</h1>
          )
        }
      </div>
    </div>
  )
}

export default HomePage;