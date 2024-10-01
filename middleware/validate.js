const AppError = require("../utils/appError");

module.exports = (handler) => {
  return async (req, res, next) => {
    const error = handler(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));
    next();
  };
};
