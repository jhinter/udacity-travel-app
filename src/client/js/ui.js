import * as moment from "moment";
import { getTrips } from "./api-internal";

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
      <div class="trip-cover" style="background-image: url(${
        trip.photo
      })"></div>
      <div class="trip-body">
          <h3>My trip to: ${trip.destination.city}, ${
    trip.destination.country
  }</h3>
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

export { updateUI };
