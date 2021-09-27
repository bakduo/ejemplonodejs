
const mongoose = require('mongoose');

const normalizr = require("normalizr");

const MensajeSchema = new mongoose.Schema(
  {
    author :{
        nombre: {
            type: String,
            required: true,
            default: '',
        },
        apellido: {
            type: String,
            required: true,
            default: '',
        },
        email: {
            type: String,
            required: true,
            default: '',
        },
        alias: {
            type: String,
            required: true,
            default: '',
        },
        avatar: {
            type: String,
            required: true,
            default: '',
        },
        edad: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    comment: {
        type: String,
        required: true,
        default: '',
      },
    tiempo: {
      type: String,
      required: true,
      default: 0,
    },
  },
  { collection: 'mensajes' }
);

module.exports = MensajeSchema;