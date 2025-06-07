import { useEffect, useState } from "react";
import _get from "lodash/get";
import * as WeatherFactory from './weather.factory';
import { getWeatherData } from './weather.helpers';
import clearDay from "../../assets/clear-day.svg";
import { MOCK_WEATHER } from './weather.mock';
import "./weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchGeolocationAndWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeatherData(lat, lon);
        }, mockWeather);
      } else {
        mockWeather();
      }
    };

    const fetchWeatherData = (lat, lon) => {
      // Uncomment below to use real API
      /*
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY`,
        { method: 'GET' }
      )
        .then(res => res.json())
        .then(response => {
          const weatherFactoryData = WeatherFactory.getWeather(response);
          const formattedWeatherData = getWeatherData(weatherFactoryData);
          setWeatherData(formattedWeatherData);
        })
        .catch(mockWeather);
      */
      mockWeather();
    };

    function mockWeather() {
      const weatherFactoryData = WeatherFactory.getWeather(MOCK_WEATHER);
      const formattedWeatherData = getWeatherData(weatherFactoryData);
      setWeatherData(formattedWeatherData);
    }

    fetchGeolocationAndWeather();
  }, []);

  const temperature = _get(weatherData, 'temperature', 26);
  const location = _get(weatherData, 'location', 'Bengaluru');
  const description = _get(weatherData, 'weather.weatherType', 'Thunderstorms');
  const icon = _get(weatherData, 'weather.weatherIcon', clearDay);

  return (
    <div className="weather-widget">
      <div className="weather-row-one">
        <img src={icon} className="weather-icon" alt="Weather Icon" />
        <p className="location">{location}</p>
      </div>
      <div className="weather-row-two">
        <p className="temperature">{temperature}</p>
        <p className="temperature-desc">{description}</p>
      </div>
    </div>
  );
};

export default Weather;