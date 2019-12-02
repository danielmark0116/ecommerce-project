require("dotenv").config();
const mongoose = require("mongoose");
const configJS = require("../config");

mongoose.set("useCreateIndex", true);

const mongoUri =
  process.env.MODE === "production"
    ? process.env.MONGO_URI
    : configJS.useProductionDb
    ? process.env.MONGO_URI
    : "mongodb://localhost:27017/ecommerce-v2";

module.exports = () => {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    server: { auto_reconnect: true }
  });

  db = mongoose.connection;

  db.on("error", e => {
    console.log("Connection error: " + e);
    mongoose.disconnect();
  });
  db.on("disconnected", function() {
    console.log("MongoDB disconnected! Trying to reconnect");

    mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      server: { auto_reconnect: true }
    });
  });
  db.once("open", () => {
    console.log("Connected to the DB");
  });
};
