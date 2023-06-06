const express = require("express");
const Todo = require("../controller/todoController");
const auth = require("../middleware/auth");
const validator = require("../middleware/validate");
const validateId = require("../middleware//validateID");

const router = express.Router();

router.post("/add", auth, validator(Todo.validateTodo), Todo.addTodo);
router.put(
  "/updateTitle/:id",
  auth,
  validateId,
  validator(Todo.validateTodo),
  Todo.updateTitle
);
router.put("/completeTodo/:id", auth, validateId, Todo.updateCompletedTodo);

router.delete("/delete/:id", auth, validateId, Todo.deleteTodo);

module.exports = router;
