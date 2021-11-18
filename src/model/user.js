const mongoose = require("mongoose");

const { DATABASE_NAME } = process.env;

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    default: null,
  },
  lastName: {
    type: String,
    required: true,
    default: null,
  },
  email: {
    type: String,
    required: true,
    default: null,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    default: null,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model(DATABASE_NAME, UserSchema);
