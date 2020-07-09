import { secrets } from "./secrets";

const { GEO_API_URL, GEO_API_USER, WEATHER_API_URL, WEATHER_API_KEY } = secrets;

async function getCoordinates(zip, placeName) {
  const endpoint = `${GEO_API_URL}/postalCodeSearchJSON?username=${GEO_API_USER}&postalcode=${zip}&placename=${placeName}`;
  return get(endpoint);
}

async function getWeatherCurrent(lat, lon) {
  const endpoint = `${WEATHER_API_URL}/current?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  return get(endpoint);
}

async function getWeatherForecast(lat, lon, date) {
  const endpoint = `${WEATHER_API_URL}/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=16`;
  return get(endpoint);
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

export { getCoordinates, getWeatherCurrent, getWeatherForecast };
