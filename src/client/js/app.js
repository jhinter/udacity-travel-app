import * as moment from "moment";
import lookup from "country-code-lookup";
import {
  getCoordinates,
  getWeather,
  getPhoto,
  saveTrip,
  getTrips,
  postTrip,
  deleteTrip,
} from "./api";

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

function validateForm() {
  // TODO
  return true;
}

updateUI();

async function updateUI() {
  const trips = await getTrips();
  const tripsSection = document.querySelector("#trips");
  tripsSection.innerHTML = "";
  trips.forEach((trip) => {
    tripsSection.appendChild(createTripCard(trip));
  });
}

function createTripCard(trip) {
  const card = document.createElement("article");
  card.classList.add("trip");
  card.innerHTML = `
    <div class="trip-cover" style="background-image: url(${trip.photo})"></div>
    <div class="trip-body">
        <h3>My trip to: ${trip.destination.city}, ${trip.destination.country}</h3>
        <h4>Departing: ${moment(trip.date).format("MM/DD/YYYY")}</h4>
        <button class="btn dark" data-trip-id="${
          trip.id
        }">remove trip</button>
        <p>
          Your trip to ${trip.destination.city}, ${trip.destination.country}
          is ${moment(trip.date).diff(moment.now(), "days")} days away.
        </p>
        <p>
          Typical weather for then is:<br />
          <span>
            High: ${trip.weather.max_temp}°C, Low:, ${trip.weather.min_temp}°C
          </span>
        </p>
        <p class="weather-info">
        <img height="40" width="40" src="https://www.weatherbit.io/static/img/icons/${
          trip.weather.weather.icon
        }.png">
          <span>
          ${trip.weather.weather.description}
          </span>
        </p>
    </div>
  `;
  return card;
}
function showOptions(places) {
  // [{"adminCode2":"091","adminCode3":"09162","adminName3":"Kreisfreie Stadt München","adminCode1":"BY","adminName2":"Upper Bavaria","lng":11.5898666666667,"countryCode":"DE","postalCode":"81539","adminName1":"Bayern","ISO3166-2":"BY","placeName":"München","lat":48.1102333333333}]}
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

export { handleSubmit, handleDelete };
