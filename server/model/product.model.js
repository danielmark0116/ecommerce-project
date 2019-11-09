const mongoose = require('mongoose');

const Product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false
    },
    desc: {
      type: String,
      required: true
    },
    ribbon: {
      type: String,
      required: false,
      default: ''
    },
    category: {
      type: String,
      required: true
    },
    sex: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 19.99
    },
    salePrice: {
      type: Number,
      required: false,
      default: 0
    },
    size: {
      type: Object,
      required: true,
      default: { xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 }
    },
    soldItems: {
      type: Object,
      required: true,
      default: { xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 }
    },
    sold: {
      type: Number,
      default: 0
    },
    img: {
      type: String,
      required: true
    },
    imgSecondary: {
      type: String,
      required: false,
      default: ''
    },
    published: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', Product);
