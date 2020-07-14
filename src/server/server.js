const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// config
dotenv.config();
const port = process.env.PORT;

// store
let trips = [];

// express backend
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// frontend
app.use(express.static("dist"));

// controllers
// for getting all stored trips
app.get("/trips/", async (req, res) => {
  res.json(trips);
});
// for saving a new trip
app.post("/trips/", async (req, res) => {
  const newTrip = req.body;
  if (newTrip.destination && newTrip.date && newTrip.weather && newTrip.photo) {
    const trip = { id: guid(), ...req.body };
    trips.push(trip);
    res.json(trip);
  } else {
    res.status(422).send("Missing parameters: Please provide valid data!");
  }
});
// for deleting a saved trip
app.delete("/trips/:id", async (req, res) => {
  const id = req.params.id;
  const index = trips.findIndex((trip) => trip.id === id);
  if (index !== -1) {
    trips = trips.filter((trip) => trip.id !== id);
    res.status(200).json({ data: { msg: "Trip deleted successfully!" } });
  } else {
    res.status(404).json({ data: { msg: "Trip not found!", error: true } });
  }
});

// server
app.listen(port, function () {
  console.log(`Travel app is listening on port ${port}!`);
});

function guid() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
