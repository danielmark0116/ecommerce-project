const mongoose = require('mongoose');

const Order = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    userPatron: {
      type: Boolean,
      required: false,
      default: false
    },
    userName: {
      type: String,
      required: true
    },
    address: {
      type: Object,
      required: true
    },
    deliveryType: {
      type: String,
      required: true
    },
    cart: {
      type: Array,
      required: true
    },
    cartValue: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      required: true
    },
    discountName: {
      type: String,
      required: false,
      default: ''
    },
    patronDiscount: {
      type: Number,
      required: false,
      default: 0
    },
    totalValue: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', Order);
