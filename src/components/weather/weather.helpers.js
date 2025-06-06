import moment from 'moment-timezone';
import _get from "lodash/get";
import _head from 'lodash/head';
import _startCase from 'lodash/startCase';

//day icons
import clearDay from "../../assets/clear-day.svg";
import cloudy from "../../assets/cloudy.svg";
import overcast from "../../assets/overcast.svg";
import partlyCloudyDayDrizzle from "../../assets/partly-cloudy-day-drizzle.svg";
import partlyCloudyDayRain from "../../assets/partly-cloudy-day-rain.svg";
import partlyCloudyDaySnow from "../../assets/partly-cloudy-day-snow.svg";
import thunderstormDayRain from "../../assets/thunderstorms-day-rain.svg";

// night icons
import clearNight from "../../assets/clear-night.svg";
import partlyCloudyNightDrizzle from "../../assets/partly-cloudy-night-drizzle.svg";
import partlyCloudyNightRain from "../../assets/partly-cloudy-night-rain.svg";
import partlyCloudyNightSnow from "../../assets/partly-cloudy-night-snow.svg";
import thunderstormNightRain from "../../assets/thunderstorms-night-rain.svg";

const getWeatherLocation = (weatherFactoryData) => {
  const location = _get(weatherFactoryData, 'name') || '';
  return location;
}

const getIsDay = () => {
  const timezone = moment.tz.guess();
  const currentHour = moment.tz(timezone).get('hour');
  const isDay = currentHour >= 6 && currentHour < 18;
  return isDay;
}

const getWeatherInfo = (weatherFactoryData) => {
  const weather = _head(_get(weatherFactoryData, 'weather'));
  const weatherDesc = _startCase(_get(weather, 'description'));
  const isDay = getIsDay();
  const id = _get(weather, 'id');
  switch(true) {
    case id >= 201 && id <= 299:
      //thunderstorm
      return { 
        weatherType: weatherDesc,
        weatherIcon: isDay ? thunderstormDayRain : thunderstormNightRain,
      }
    case id >= 300 && id <= 399:
      //drizzle
      return { 
        weatherType: weatherDesc,
        weatherIcon: isDay ? partlyCloudyDayDrizzle : partlyCloudyNightDrizzle,
      }
    case id >= 500 && id <= 599:
      //rain
      return { 
        weatherType: weatherDesc,
        weatherIcon: isDay ? partlyCloudyDayRain : partlyCloudyNightRain,
      }
    case id >= 600 && id <= 699:
      //snow
      return { 
        weatherType: weatherDesc,
        weatherIcon: isDay ? partlyCloudyDaySnow : partlyCloudyNightSnow,
      }
    case id >= 701 && id <= 799:
      //atmosphere TODO various mist,smoke etc support
      return { 
        weatherType: weatherDesc,
        weatherIcon: isDay ? overcast : overcast,
      }
    case id === 800:
      //clear
      return { 
        weatherType: weatherDesc,
        weatherIcon: isDay ? clearDay : clearNight,
      }
    case id >= 801 && id <= 899:
      //clouds TODO can be more segregated in more welldefined codes
      return { 
        weatherType: weatherDesc,
        weatherIcon: isDay ? cloudy : cloudy,
      }
    default: // TODO if no data
    return { 
      weatherType: weatherDesc,
      weatherIcon: isDay ? overcast : overcast,
    }
  }
}

const getWeatherTemperature = (weatherFactoryData, isSetInCelsius = true) => {
  const tempInCelsius = Math.trunc(_get(weatherFactoryData, 'main.temp') - 273.15) || 26;
  const tempInFahrenheit = Math.trunc((_get(weatherFactoryData, 'main.temp') - 273.15) * (9/5) + 32) || 26;
  return isSetInCelsius ? tempInCelsius : tempInFahrenheit;
}

export const getWeatherData = (weatherFactoryData, isSetInCelsius) => {
  const location = getWeatherLocation(weatherFactoryData);
  const weather = getWeatherInfo(weatherFactoryData);
  const temperature = getWeatherTemperature(weatherFactoryData, isSetInCelsius);
  return {
    location,
    weather,
    temperature
  }
}

