const Todo = require("../models/todo.model");
const { accessErrorHandler } = require("../../../lib/errorHandler");
const ErrorEnum = require("../../../lib/enums/error");

exports.create = async todo => {
  try {
    return await Todo.create(todo);
  } catch (err) {
    throw accessErrorHandler(err);
  }
};

exports.getAll = async () => {
  try {
    return await Todo.findAll();
  } catch (err) {
    throw accessErrorHandler(err);
  }
};

exports.getById = async id => {
  try {
    return await Todo.findByPk(id);
  } catch (err) {
    throw accessErrorHandler(err);
  }
};

exports.update = async todo => {
  try {
    return await Todo.update(todo, { where: { id: todo.id } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
};

exports.delete = async id => {
  try {
    return await Todo.destroy({ where: { id: id } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
};
