const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// config
dotenv.config();
const port = process.env.PORT;

// store
const trips = [];

// express backend
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// frontend
app.use(express.static("dist"));

// controllers
app.post("/trips/", async (req, res) => {
  console.log(req.body);
  if (true) {
    const trip = {id: guid(), ...req.body};
    trips.push(trip);
    res.json(trip);
  } else {
    res
      .status(422)
      .send("Missing parameters: Please provide a valid trip!");
  }
});

app.get("/trips/", async (req, res) => {
  res.json(trips);
});

// server
app.listen(port, function () {
  console.log(`Travel app is listening on port ${port}!`);
});

function guid() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}