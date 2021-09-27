const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      default: '',
    },
    email: {
        type: String,
        required: false,
        default: '',
      },
    password: {
      type: String,
      required: true,
      default: '',
    },
  },
  { collection: 'users' }
);

module.exports = UserSchema;
