const { Task } = require("../models");

// Get All Tasks
exports.getTasks = async (req, res) => {
  try {
    const {id} = req.params
    console.log('id...',id)
    const tasks = await Task.findAll({
      where :{
        userId:Number(id)
      }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description,userId } = req.body;
    console.log('title..description',title, description,userId)
    const task = await Task.create({ title, description, userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
