const User = require("../model/useModel");
const AppError = require("../utils/appError");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const JWT = require("jsonwebtoken");

// For Creating User
module.exports.createUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return next(new AppError("This email id is already exits", 400));
  }
  const passHash = await bcrypt.hash(req.body.password, 12);

  const createUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
  });
  createUser.password = undefined;
  res.status(200).json({
    status: 200,
    message: "User created successfully",
    data: createUser,
  });
};

// For Login User
module.exports.login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("No user found", 400));
  const userPassword = user.password;
  const isPasswordMatch = await bcrypt.compare(req.body.password, userPassword);
  if (!isPasswordMatch) return next(new AppError("Invalid password", 400));

  const token = generateToken(req.body.email);
  const cookieOptions = {
    expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: true,
  };
  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(200).json({
    status: 200,
    message: "Login Successfull",
    token,
  });
};

// Validation
module.exports.validateSignUp = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(55).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(5).max(100).required(),
  });

  const result = schema.validate(user);
  return result.error;
};

module.exports.validateLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(5).max(100).required(),
  });
  const result = schema.validate(user);
  return result.error;
};

// Generate Token

function generateToken(email) {
  return JWT.sign(
    {
      email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "20m" }
  );
}
// messages({
//   "string.base": "Name must be a string.",
//   "string.empty": "Name is required.",
//   "string.min": "Name must be at least {#limit} characters.",
//   "string.max": "Name must not exceed {#limit} characters.",
//   "any.required": "Name is required.",
// })
