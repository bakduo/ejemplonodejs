const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: '',
    },
    thumbail: {
      type: String,
      required: true,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { collection: 'productos' }
);

module.exports = ProductoSchema;