const TodoAccess = require("../dataAccess/todo.access");
const SuccessEnum = require("../../../lib/enums/success");
const ErrorEnum = require("../../../lib/enums/error");
const { handleError } = require("../../../lib/errorHandler");

exports.createTodo = async (req, res) => {
  try {
    let todo = await TodoAccess.create(req.body);
    res.send(todo);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    let todos = await TodoAccess.getAll();
    res.send(todos);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getTodo = async (req, res) => {
  try {
    let todo = req.todo;
    res.send(todo);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    let todo = req.todo.toJSON();
    let newValues = req.body;
    for (var key in newValues) {
      todo[key] = newValues[key];
    }
    await TodoAccess.update(todo);
    res.send(SuccessEnum.UPDATE);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    let todo = req.todo.toJSON();
    await TodoAccess.delete(todo.id);
    res.send(SuccessEnum.DELETE);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Middlewares
exports.getTodoById = async (req, res, next, id) => {
  try {
    let todo = await TodoAccess.getById(id);
    if (!todo) throw "Not found";
    req.todo = todo;
    next();
  } catch (err) {
    res.status(400).send(err);
  }
};
