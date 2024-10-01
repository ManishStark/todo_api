const Todo = require("../model/todoModel");
const AppError = require("../utils/appError");
const Joi = require("joi");

module.exports.getAllTodo = async (req, res, next) => {
  const todos = await Todo.find({ email: req.user.email, completed: false });
  // if (todos.length == 0) return next(new AppError("No todos yet..!", 400));
  res.status(200).json({
    status: 200,
    message: "success",
    data: todos,
  });
};

module.exports.addTodo = async (req, res, next) => {
  const isExists = await Todo.find({
    title: req.body.title,
    email: req.user.email,
    completed: false,
  });
  if (isExists.length != 0) {
    res.status(400).json({
      status: 400,
      message: "This email is exist",
    });
  }

  await Todo.create({
    title: req.body.title,
    email: req.user.email,
  });

  res.status(200).json({
    status: 200,
    message: "Todo added",
  });
};

module.exports.updateTitle = async (req, res, next) => {
  await Todo.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.body.title }
  );

  res.status(200).json({
    status: 200,
    message: "Title Updated",
  });
};

module.exports.updateCompletedTodo = async (req, res, next) => {
  await Todo.findOneAndUpdate({ _id: req.params.id }, { completed: true });
  res.status(200).json({
    status: 200,
    message: "Todo Completed",
  });
};

module.exports.deleteTodo = async (req, res, next) => {
  await Todo.findOneAndDelete({ _id: req.params.id });
  res.status(200).send("Deleted");
};
// Validation

module.exports.validateTodo = (todo) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(55).required(),
  });
  const result = schema.validate(todo);
  return result.error;
};
