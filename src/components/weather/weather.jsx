import * as React from "react";
import _get from "lodash/get";
import * as WeatherFactory from './weather.factory';
import { getWeatherData } from './weather.helpers';
import clearDay from "../../assets/clear-day.svg";
import { MOCK_WEATHER } from './weather.mock';
import "./weather.css"

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
    }
  }

  componentDidMount() {
    this.fetchGeolocationAndWeather();
  }

  fetchGeolocationAndWeather = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.fetchWeatherData(lat, lon);
      })
    }
  }

  fetchWeatherData = (lat, lon) => {
    // fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e2db8fa69cec6c03384691aa64574d49`,
    //   {
    //     method: 'GET',

    //   }
    // ).then((res) => {
    //   return res.json();
    // }).then((response) => {
    //   console.log(response, "response -")
    //   const weatherFactoryData = WeatherFactory.getWeather(response);
    //   const formattedWeatherData = getWeatherData(weatherFactoryData);
    //     this.setState({
    //       weatherData: formattedWeatherData,
    //     })
    // }).catch((e) => { console.log(e) });
    const weatherFactoryData = WeatherFactory.getWeather(MOCK_WEATHER);
    console.log('MOCK_WEATHER: ', MOCK_WEATHER);
    const formattedWeatherData = getWeatherData(weatherFactoryData);
    this.setState({
      weatherData: formattedWeatherData
    })
  }

  render() {
    const { weatherData } = this.state;
    const temperature = _get(weatherData, 'temperature') || 26;
    const location = _get(weatherData, 'location') || 'Bengaluru';
    const description = _get(weatherData, 'weather.weatherType') || 'Thunderstorms';
    const icon = _get(weatherData, 'weather.weatherIcon') || clearDay;
  
    return (
      <div className="weather-widget">
        <div className="weather-row-one">
          <img src={icon} className="weather-icon" alt="My Image" />
          <p className="location">{location}</p>
        </div>

        <div className="weather-row-two">
          <p className="temperature">{temperature}</p>
          <p className="temperature-desc">{description}</p>
        </div>
    </div>
    );
  }
}
