const winston = require("winston");

module.exports = (err, req, res) => {
  winston.error(err.message, err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: err.message,
  });
};
