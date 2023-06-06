const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 20,
    minlength: 5,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 55,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
    maxlength: 100,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("users", schema);

module.exports = User;
