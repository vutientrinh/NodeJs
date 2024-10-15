const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({
    message: "Hello Vu Tien Trinh",
  });
});
require("./app/routers/note.routers.js")(app);
app.listen(3000, () => {
  console.log("Listening in port 3000");
});

// Configuring the database
// const dbConfig = require("./config/database.config.js");
const dbConfig = "mongodb://localhost:27017/node";
console.log("MONGO_URL:", process.env.MONGO_URL);

// const dbConfig =
//   "mongodb://vutientrinh0357:SsuzjfFbziUhAuJT@atlas-sql-670de6e951443764c8f6606c-ra4oy.a.query.mongodb.net/node?ssl=true&authSource=admin";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
