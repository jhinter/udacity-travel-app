import { secrets } from "./secrets";
import * as moment from "moment";

const { GEO_API_URL, GEO_API_USER, WEATHER_API_URL, WEATHER_API_KEY } = secrets;

async function getCoordinates(zip, placeName) {
  const endpoint = `${GEO_API_URL}/postalCodeSearchJSON?username=${GEO_API_USER}&postalcode=${zip}&placename=${placeName}`;
  return get(endpoint);
}

async function getWeather(lat, lon, date) {
  const today = moment.now();
  if (date.diff(today, "days") < 7) {
    return getWeatherCurrent(lat, lon);
  }
  return getWeatherForecast(lat, lon, date);
}

async function getWeatherCurrent(lat, lon) {
  const endpoint = `${WEATHER_API_URL}/current?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  return get(endpoint);
}

async function getWeatherForecast(lat, lon, tripDate) {
  const endpoint = `${WEATHER_API_URL}/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=16`;
  return new Promise((resolve, reject) => {
    get(endpoint).then((response) => {
      const relevantForecast = response.data.filter((element) => {
        return moment(element.datetime, "YYYY-MM-DD").diff(tripDate, 'days') === 0;
      });
      if (relevantForecast.length === 1) {
        resolve(...relevantForecast);
      } else {
        reject("No forecast found!");
      }
    });
  });
}

async function post(path, object) {
  const response = await fetch(path, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (response.status !== 200) {
    throw new Error("Error!");
  }
  const data = await response.json();
  return data;
}

async function get(path) {
  const response = await fetch(path, {
    method: "GET",
    credentials: "same-origin",
  });
  if (response.status !== 200) {
    throw new Error("Error!");
  }
  const data = await response.json();
  return data;
}

export { getCoordinates, getWeather };
