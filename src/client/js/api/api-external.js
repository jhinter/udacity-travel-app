import { secrets } from "./secrets";
import * as moment from "moment";
import { getRequest } from "./base-requests";

const {
  GEO_API_URL,
  GEO_API_USER,
  WEATHER_API_URL,
  WEATHER_API_KEY,
  PIXA_API_URL,
  PIXA_API_KEY,
} = secrets;

async function getCoordinates(city, zip) {
  const endpoint = `${GEO_API_URL}/postalCodeSearchJSON?username=${GEO_API_USER}&postalcode=${zip}&placename=${city}`;
  return getRequest(endpoint);
}

async function getWeather(trip) {
  const { date } = trip;
  const { lat, lon } = trip.destination;

  const today = moment.now();
  
  if (date.diff(today, "days") > 16) {
    throw new Error('Sorry, but we do not have forecasts for >=16 days in the future!');
  }

  if (date.diff(today, "days") <= 7) {
    return getWeatherCurrent(lat, lon);
  }

  return getWeatherForecast(lat, lon, date);
}

// fetches current weather for a given location
async function getWeatherCurrent(lat, lon) {
  const endpoint = `${WEATHER_API_URL}/current?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  return new Promise((resolve, reject) => {
    getRequest(endpoint).then((response) => {
      if (response.data.length === 1) {
        resolve(...response.data);
      } else {
        reject(new Error("Invalid response from weather API!"));
      }
    });
  });
}

// fetches weather forecast for the next 16 days
async function getWeatherForecast(lat, lon, tripDate) {
  const endpoint = `${WEATHER_API_URL}/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=16`;
  return new Promise((resolve, reject) => {
    getRequest(endpoint).then((response) => {
      const relevantForecast = response.data.filter((element) => {
        return (
          moment(element.datetime, "YYYY-MM-DD").diff(tripDate, "days") === 0
        );
      });
      if (relevantForecast.length === 1) {
        resolve(...relevantForecast);
      } else {
        reject(new Error("No forecast found!"));
      }
    });
  });
}

async function getPhoto(trip) {
  const { destination } = trip;
  const baseUrl = `${PIXA_API_URL}/?key=${PIXA_API_KEY}`;

  let encodedQuery = encodeURI(destination.city);
  let endpoint = `${baseUrl}&q=${encodedQuery}`;

  return new Promise((resolve) => {
    getRequest(endpoint).then((response) => {
      if (response.hits.length > 0) {
        resolve(response.hits[0].largeImageURL);
      } else {
        // falling back on country image
        encodedQuery = encodeURI(destination.country);
        endpoint = `${baseUrl}&q=${encodedQuery}`;
        getRequest(endpoint).then((response) => {
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

export { getCoordinates, getWeather, getPhoto };
