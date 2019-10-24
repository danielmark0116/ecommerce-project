const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    providerId: {
      type: String,
      required: true,
      unique: true
    },
    provider: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    orders: {
      type: Array,
      required: false,
      default: []
    },
    addresses: {
      type: Array,
      required: false,
      default: []
    },
    patron: {
      type: Boolean,
      required: false,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: true
    },
    admin: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', User);
