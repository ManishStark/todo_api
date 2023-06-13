const express = require("express");
const userRoute = require("../routes/userRoute");
const todoRoute = require("../routes/todoRoute");
const error = require("../middleware/error");

// For Security must include following middlewares
const helmet = require("helmet"); //this include some secure headers
const morgan = require("morgan"); // log all apis request in console
const rateLimit = require("express-rate-limit"); // limit request through per ip
const xssClean = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp"); // preven parametes pollution
const cookieParser = require("cookie-parser");

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "To many requests from this IP, try again after 1 hour..",
});

module.exports = function (app) {
  // Middleware for security
  app.use(helmet());
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
  app.use("/", limiter);
  app.use(xssClean());
  app.use(mongoSanitize());
  app.use(hpp());
  app.use(cookieParser());

  // Router for APIs
  app.use(express.json({ limit: "10kb" }));
  app.use("/api/user", userRoute);
  app.use("/api/todo", todoRoute);
  app.use("*", (req, res) =>
    res.status(404).json({ status: 500, message: "No Routes Found..!" })
  );
  app.use(error);
};
