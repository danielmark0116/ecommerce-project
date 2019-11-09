require('dotenv').config();
const mongoose = require('mongoose');
const configJS = require('../config');

const mongoUri =
  process.env.MODE === 'production'
    ? process.env.MONGO_URI
    : configJS.useProductionDb
    ? process.env.MONGO_URI
    : 'mongodb://localhost:27017/ecommerce-v2';

module.exports = () => {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  db = mongoose.connection;

  db.on('error', () => console.log('Connection error'));
  db.once('open', () => {
    console.log('Connected to the DB');
  });
};
