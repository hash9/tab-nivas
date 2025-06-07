import moment from 'moment-timezone';
import _get from "lodash/get";
import _head from 'lodash/head';
import _startCase from 'lodash/startCase';

// Day icons
import clearDay from "../../assets/clear-day.svg";
import cloudy from "../../assets/cloudy.svg";
import overcast from "../../assets/overcast.svg";
import partlyCloudyDayDrizzle from "../../assets/partly-cloudy-day-drizzle.svg";
import partlyCloudyDayRain from "../../assets/partly-cloudy-day-rain.svg";
import partlyCloudyDaySnow from "../../assets/partly-cloudy-day-snow.svg";
import thunderstormDayRain from "../../assets/thunderstorms-day-rain.svg";

// Night icons
import clearNight from "../../assets/clear-night.svg";
import partlyCloudyNightDrizzle from "../../assets/partly-cloudy-night-drizzle.svg";
import partlyCloudyNightRain from "../../assets/partly-cloudy-night-rain.svg";
import partlyCloudyNightSnow from "../../assets/partly-cloudy-night-snow.svg";
import thunderstormNightRain from "../../assets/thunderstorms-night-rain.svg";

const getWeatherLocation = weatherFactoryData =>
  _get(weatherFactoryData, 'name', '');

const getIsDay = () => {
  const timezone = moment.tz.guess();
  const hour = moment.tz(timezone).hour();
  return hour >= 6 && hour < 18;
};

const getWeatherInfo = weatherFactoryData => {
  const weather = _head(_get(weatherFactoryData, 'weather')) || {};
  const weatherDesc = _startCase(weather.description || '');
  const isDay = getIsDay();
  const id = weather.id || 0;

  if (id >= 201 && id <= 299) {
    // Thunderstorm
    return {
      weatherType: weatherDesc,
      weatherIcon: isDay ? thunderstormDayRain : thunderstormNightRain,
    };
  }
  if (id >= 300 && id <= 399) {
    // Drizzle
    return {
      weatherType: weatherDesc,
      weatherIcon: isDay ? partlyCloudyDayDrizzle : partlyCloudyNightDrizzle,
    };
  }
  if (id >= 500 && id <= 599) {
    // Rain
    return {
      weatherType: weatherDesc,
      weatherIcon: isDay ? partlyCloudyDayRain : partlyCloudyNightRain,
    };
  }
  if (id >= 600 && id <= 699) {
    // Snow
    return {
      weatherType: weatherDesc,
      weatherIcon: isDay ? partlyCloudyDaySnow : partlyCloudyNightSnow,
    };
  }
  if (id >= 701 && id <= 799) {
    // Atmosphere (mist, smoke, etc.)
    return {
      weatherType: weatherDesc,
      weatherIcon: overcast,
    };
  }
  if (id === 800) {
    // Clear
    return {
      weatherType: weatherDesc,
      weatherIcon: isDay ? clearDay : clearNight,
    };
  }
  if (id >= 801 && id <= 899) {
    // Clouds
    return {
      weatherType: weatherDesc,
      weatherIcon: cloudy,
    };
  }
  // Default/fallback
  return {
    weatherType: weatherDesc,
    weatherIcon: overcast,
  };
};

const getWeatherTemperature = (weatherFactoryData, isSetInCelsius = true) => {
  const tempK = _get(weatherFactoryData, 'main.temp');
  if (typeof tempK !== 'number') return 26;
  return isSetInCelsius
    ? Math.trunc(tempK - 273.15)
    : Math.trunc((tempK - 273.15) * (9 / 5) + 32);
};

export const getWeatherData = (weatherFactoryData, isSetInCelsius = true) => ({
  location: getWeatherLocation(weatherFactoryData),
  weather: getWeatherInfo(weatherFactoryData),
  temperature: getWeatherTemperature(weatherFactoryData, isSetInCelsius),
});