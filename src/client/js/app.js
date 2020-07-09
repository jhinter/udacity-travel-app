import * as moment from "moment";
import lookup from "country-code-lookup";
import { getCoordinates, getWeather, getPhoto } from "./api";

async function handleSubmit(event) {
  event.preventDefault();

  if (!validateForm()) {
    alert("Attention: Your Input isn't valid!");
    return;
  }

  try {
    const zip = form.querySelector("#zip").value;
    const city = form.querySelector("#place-name").value;
    const date = form.querySelector("#date").value;

    const potentialPlaces = await getCoordinates(city, zip);
    if (potentialPlaces.postalCodes.length > 1) {
      showOptions(potentialPlaces.postalCodes);
      console.log("Attention: more than 1 hit!");
      // return;
    }

    // for now
    const selectedPlace = potentialPlaces.postalCodes[0];

    const trip = {
      destination: {
        city: selectedPlace.placeName,
        zip: selectedPlace.postalCode,
        country: lookup.byIso(selectedPlace.countryCode).country,
        lat: selectedPlace.lat,
        lon: selectedPlace.lng,
      },
      date: moment(date)
    }
    console.log("place:", trip.destination);

    const weather = await getWeather(trip);
    console.log("weather forecast/current: ", weather);

    const photo = await getPhoto(trip);
    console.log(photo);

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
