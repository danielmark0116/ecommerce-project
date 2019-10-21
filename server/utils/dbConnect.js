const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(`mongodb://localhost:27017/ecommerce-v2`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndexes: true
  });

  db = mongoose.connection;

  db.on('error', () => console.log('Connection error'));
  db.once('open', () => {
    console.log('Connected to the DB');
  });
};
