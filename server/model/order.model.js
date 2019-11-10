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
    deliveryValue: {
      type: Number,
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
      default: 1
    },
    totalValue: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    deliveryId: {
      type: String,
      required: false,
      default: ''
    },
    paymentIntentId: {
      type: String,
      required: false,
      default: ''
    },
    paymentDate: {
      type: Date,
      required: false,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', Order);

// STATUSES
/*
- init - order created NOT PAID yet -> can be deleted by user
- paid - order PAID -> can be packed and sent
- processing - order PROCESSING / BUT rather SUCCESSFULL -> DOUBLE CHECK
- fail - PAYMENT FAILURE -> option to repay in the order page
- sent - order paid, packed and sent to the client - DELIVERYID to update, so user can track
- success - paid, sent, delivered
*/
