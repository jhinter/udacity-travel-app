const dotenv = require("dotenv");
const app = require('./app.js')

// config
dotenv.config();
const port = process.env.PORT;

// server
app.listen(port, function () {
    console.log(`Travel app is listening on port ${port}!`);
});