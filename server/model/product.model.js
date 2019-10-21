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
    img: {
      type: String,
      required: true
    },
    published: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', Product);
