import { getRequest, postRequest, deleteRequest } from "./base-requests";

async function getTrips() {
  const endpoint = `/trips`;
  return getRequest(endpoint);
}

async function postTrip(trip) {
  const endpoint = `/trips`;
  return postRequest(endpoint, trip);
}

async function deleteTrip(id) {
  const endpoint = `/trips`;
  return deleteRequest(endpoint, id);
}

export { getTrips, postTrip, deleteTrip };
