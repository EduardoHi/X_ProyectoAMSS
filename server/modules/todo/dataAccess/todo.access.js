
const Todo = require('../models/todo.model');

exports.createTodo = (todo) => {
    return Todo.create(todo)
}

exports.getAllTodos = () => {
    return Todo.findAll()
}

exports.getById = (id) => {
    return Todo.findByPk(id)
}

exports.updateTodo = (todo) => {
    return Todo.update(todo, { where: { id: todo.id } })
}