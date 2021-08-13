const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema(
  {
    title: {
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

module.exports = mongoose.model('Producto', ProductoSchema);