import * as moment from "moment";
import lookup from "country-code-lookup";
import { getCoordinates, getWeather, getPhoto } from "./api/api-external";
import { postTrip, deleteTrip } from "./api/api-internal";
import { updateUI } from "./ui";

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
      date: moment(date),
    };
    console.log("place:", trip.destination);

    const weather = await getWeather(trip);
    console.log("weather forecast/current: ", weather);

    const photo = await getPhoto(trip);
    console.log(photo);

    trip.photo = photo;
    trip.weather = weather;

    const savedTrip = await postTrip(trip);

    await updateUI();
  } catch (error) {
    console.log(error);
  }
}

async function handleDelete() {
  console.log(event.target);
  const id = event.target.getAttribute("data-trip-id");

  try {
    const result = await deleteTrip(id);
    updateUI();
  } catch (error) {
    console.log(error);
  }
}

function validateForm() {
    return true;
}

export { handleSubmit, handleDelete };
