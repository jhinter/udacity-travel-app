import { getCoordinates, getWeatherCurrent, getWeatherForecast } from "./api";

async function handleSubmit(event) {
  event.preventDefault();

  if (!validateForm()) {
    alert("Attention: Your Input isn't valid!");
    return;
  }

  try {
    const zip = form.querySelector("#zip").value;
    const placeName = form.querySelector("#place-name").value;
    const date = form.querySelector("#date").value;

    const potentialPlaces = await getCoordinates(zip, placeName);
    if (potentialPlaces.postalCodes.length > 1) {
      showOptions(potentialPlaces.postalCodes);
      console.log("Attention: more than 1 hit!");
      // return;
    }

    // for now
    const selectedPlace = potentialPlaces.postalCodes[0];
    const place = {
      name: selectedPlace.placeName,
      zip: selectedPlace.postalCode,
      lat: selectedPlace.lat,
      lng: selectedPlace.lng,
    };

    console.log("place:", place);

    const weatherCurrent = await getWeatherCurrent(place.lat, place.lng);
    console.log("weather current: ", weatherCurrent.data);

    const weatherForecast = await getWeatherForecast(place.lat, place.lng);
    console.log("weather forecast: ", weatherForecast.data);

    // TODO
    // sending requests
    // updating ui
  } catch (error) {
    console.log(error);
  }
}

function validateForm() {
  // TODO
  return true;
}

function updateUI() {
  // TODO
}

function showOptions(places) {
  // [{"adminCode2":"091","adminCode3":"09162","adminName3":"Kreisfreie Stadt München","adminCode1":"BY","adminName2":"Upper Bavaria","lng":11.5898666666667,"countryCode":"DE","postalCode":"81539","adminName1":"Bayern","ISO3166-2":"BY","placeName":"München","lat":48.1102333333333}]}
}
export { handleSubmit };
