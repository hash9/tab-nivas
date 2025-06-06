import _pick from 'lodash/pick';

const pickRawWeatherData = (response) => {
  return _pick(response, ['weather', 'main', 'name']);
}

export const getWeather = (response) => {
  const rawWeatherData = pickRawWeatherData(response);
  return rawWeatherData
}