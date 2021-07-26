
const mongoose = require('mongoose');

const normalizr = require("normalizr");

//const schema = normalizr.schema;

//const normalize = normalizr.normalize;

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

// var mensaje = {
//   author: {
//   email: 'mail del usuario' ,
//   nombre: 'nombre del usuario' ,
//   apellido: 'apellido del usuario' ,
//   edad: 'edad del usuario' ,
//   alias: 'alias del usuario' ,
//   avatar: 'url avatar (foto, logo) del usuario'
//   },
//   text: 'mensaje del usuario'
//   }

// const normalizr = require("normalizr");

// const schema = normalizr.schema;

// const normalize = normalizr.normalize;

// var originalData = {
//     id:'mensaje',    
//         author: {
//             email: 'mail del usuario' ,
//             nombre: 'nombre del usuario' ,
//             apellido: 'apellido del usuario' ,
//             edad: 'edad del usuario' ,
//             alias: 'alias del usuario' ,
//             avatar: 'url avatar (foto, logo) del usuario'
//         },
//         comment: 'mensaje del usuario',
//     }

// const comment = new schema.Entity('comment',{});
// const author = new schema.Entity('author',{comment},{idAttribute: 'email'});
// const mensaje = new schema.Entity('mensaje',{
//     assignee:author,
//     comment
// });
//module.exports = mensaje

module.exports = mongoose.model('Mensaje', MensajeSchema);