const express = require("express");
const userRoute = require("../routes/userRoute");
const todoRoute = require("../routes/todoRoute");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json({ limit: "10kb" }));
  app.use("/api/user", userRoute);
  app.use("/api/todo", todoRoute);
  app.use("*", (req, res) => res.status(404).send("No Routes found"));
  app.use(error);
};
