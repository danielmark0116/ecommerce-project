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
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10,
    bufferMaxEntries: 0
  });

  db = mongoose.connection;

  db.on("error", e => {
    console.log("Connection error: " + e);
  });

  db.once("open", () => {
    console.log("Connected to the DB");
  });
};
