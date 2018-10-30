var express = require('express');
var router = express.Router();

const todoController = require('../controllers/todo.controllers')

const MODULE_PATH = "/todo";

router.route(MODULE_PATH + '/')
    .get(todoController.getAllTodos)
    .post(todoController.createTodo);

router.route(MODULE_PATH + '/:todoId')
    .get(todoController.getTodo)
    .put(todoController.updateTodo)
    .delete(todoController.deleteTodo);

router.param('todoId', todoController.getTodoById);

module.exports = router;