import * as moment from "moment";
import lookup from "country-code-lookup";
import { getCoordinates, getWeather, getPhoto } from "./api/api-external";
import { postTrip, deleteTrip } from "./api/api-internal";
import { updateUI } from "./ui";

async function handleSubmit(event) {
  event.preventDefault();

  const userInput = {
    zip: form.querySelector("#zip").value,
    city: form.querySelector("#place-name").value,
    date: form.querySelector("#date").value,
  };

  try {

    if (!validateForm(userInput)) {
      throw new Error("Attention: Your Input isn't valid!");
    }
    const potentialPlaces = await getCoordinates(userInput.city, userInput.zip);
    if (potentialPlaces.postalCodes.length === 0) {
      throw new Error("Place not found!");
    }
    if (potentialPlaces.postalCodes.length > 1) {
      throw new Error(
        "There is more then 1 hit for your destination. Please be more specific!"
      );
    }
    const destination = potentialPlaces.postalCodes[0];

    const trip = {
      destination: {
        city: destination.placeName,
        zip: destination.postalCode,
        country: lookup.byIso(destination.countryCode).country,
        lat: destination.lat,
        lon: destination.lng,
      },
      date: moment(userInput.date),
    };

    // fetching weather and photo
    const weather = await getWeather(trip);
    const photo = await getPhoto(trip);

    trip.photo = photo;
    trip.weather = weather;

    // saving trip
    await postTrip(trip);

    // rendering changes
    await updateUI();
  } catch (error) {
    alert("Error while requesting new trip information: " + error);
  }
}

async function handleDelete() {
  const id = event.target.getAttribute("data-trip-id");
  try {
    await deleteTrip(id);
    await updateUI();
  } catch (error) {
    alert("Trip could not be deleted!");
  }
}

function validateForm(userInput) {
  return userInput.city && userInput.zip && userInput.date;
}

export { handleSubmit, handleDelete, validateForm };
