const Task = require("../models/Task");
const asyncWrapper = require("./../middlewares/async");
const { createCustomError } = require("./../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const task = await Task.find({});
  res.status(201).json({ task });
  // res.status(201).json({ task, amount: task.length });
  // res.status(201).json({ sucess: true });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id });
  if (!task) {
    return next(createCustomError(`No task with id ${id}`, 404));
  }
  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id ${id}`, 404));
  }
  res.status(200).json({ task });
});

const editTask = asyncWrapper(async (req, res) => {
  //this is for put
  const { id } = req.params;
  const task = await Task.findOneAndReplace({ _id: id }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id ${id}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({
    _id: id,
  });
  if (!task) {
    return next(createCustomError(`No task with id ${id}`, 404));
  }
  res.status(200).json({
    msg: `A task with id ${id} was deleted successfully`,
    data: task,
  });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  editTask,
  updateTask,
  deleteTask,
};
