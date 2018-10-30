
const Todo = require('../models/todo.model');

exports.create = (todo) => {
    return Todo.create(todo)
}

exports.getAll = () => {
    return Todo.findAll()
}

exports.getById = (id) => {
    return Todo.findByPk(id)
}

exports.update = (todo) => {
    return Todo.update(todo, { where: { id: todo.id } })
}

exports.delete = (id) => {
    return Todo.destroy({ where: { id: id } })
}