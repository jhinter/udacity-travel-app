import { secrets } from "./secrets";
import * as moment from "moment";

const {
  GEO_API_URL,
  GEO_API_USER,
  WEATHER_API_URL,
  WEATHER_API_KEY,
  PIXA_API_URL,
  PIXA_API_KEY,
} = secrets;

export async function getCoordinates(city, zip) {
  const endpoint = `${GEO_API_URL}/postalCodeSearchJSON?username=${GEO_API_USER}&postalcode=${zip}&placename=${city}`;
  return get(endpoint);
}

export async function getWeather(trip) {
  const { date } = trip;
  const { lat, lon } = trip.destination;

  const today = moment.now();

  if (date.diff(today, "days") < 7) {
    return getWeatherCurrent(lat, lon);
  }

  return getWeatherForecast(lat, lon, date);
}

// fetches current weather for a given location
async function getWeatherCurrent(lat, lon) {
  const endpoint = `${WEATHER_API_URL}/current?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  return get(endpoint);
}

// fetches weather forecast for the next 16 days
async function getWeatherForecast(lat, lon, tripDate) {
  const endpoint = `${WEATHER_API_URL}/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=16`;
  return new Promise((resolve, reject) => {
    get(endpoint).then((response) => {
      const relevantForecast = response.data.filter((element) => {
        return (
          moment(element.datetime, "YYYY-MM-DD").diff(tripDate, "days") === 0
        );
      });
      if (relevantForecast.length === 1) {
        resolve(...relevantForecast);
      } else {
        reject("No forecast found!");
      }
    });
  });
}

export async function getPhoto(trip) {
  const { destination } = trip;
  const baseUrl = `${PIXA_API_URL}/?key=${PIXA_API_KEY}`;

  let encodedQuery = encodeURI(destination.city);
  let endpoint = `${baseUrl}&q=${encodedQuery}`;

  return new Promise((resolve) => {
    get(endpoint).then((response) => {
      if (response.hits.length > 0) {
        resolve(response.hits[0].largeImageURL);
      } else {
        // falling back on country image
        encodedQuery = encodeURI(destination.country);
        endpoint = `${baseUrl}&q=${encodedQuery}`;
        get(endpoint).then((response) => {
          if (response.hits.length > 0) {
            resolve(response.hits[0].largeImageURL);
          } else {
            // falling back on generic travel image
            const fallbackPicture =
              "https://cdn.pixabay.com/photo/2016/01/09/18/27/old-1130731_960_720.jpg";
            resolve(fallbackPicture);
          }
        });
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
