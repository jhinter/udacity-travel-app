const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// config
dotenv.config();
const port = process.env.PORT;

// express backend
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// frontend
app.use(express.static("dist"));

// controllers
// TODO

// server
app.listen(port, function () {
  console.log(`Travel app is listening on port ${port}!`);
});
