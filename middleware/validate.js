const AppError = require("../utils/appError");

module.exports = (handler) => {
  return async (req, res, next) => {
    const err = handler(req.body);
    if (err) return next(new AppError(err.details[0].message, 400));
    next();
  };
};
