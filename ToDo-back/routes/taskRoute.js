const express = require("express");
const { getTasks, createTask, updateTask, deleteTask } = require("../controller/taskController");
const taskRouter = express.Router();
const {authenticate} = require('../middleware/authMiddleware')
taskRouter.get("/:id",authenticate, getTasks);
taskRouter.post("/",authenticate, createTask);
taskRouter.put("/:id",authenticate, updateTask);
taskRouter.delete("/:id",authenticate, deleteTask);

module.exports = taskRouter;
