const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 55,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 55,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Todo = mongoose.model("todos", schema);

module.exports = Todo;
