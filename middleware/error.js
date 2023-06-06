const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    stauts: statusCode,
    message: err.message,
  });
};
