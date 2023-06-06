const express = require("express");
const User = require("../controller/userController");
const Validator = require("../middleware/validate");

const router = express.Router();

router.post("/signup", Validator(User.validateSignUp), User.createUser);
router.post("/login", Validator(User.validateLogin), User.login);

module.exports = router;
