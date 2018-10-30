
const TodoAccess = require('../dataAccess/todo.access')


exports.createTodo = async (req, res) => {
    try {
        let todo = await TodoAccess.createTodo(req.body)
        res.send(todo)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

exports.getAllTodos = async (req, res) => {
    try {
        let todos = await TodoAccess.getAllTodos()
        res.send(todos)
    } catch (err) {
        console.error(err)
        res.send(err)
    }
};

exports.getTodo = async (req, res) => {
    try {
        let todo = req.todo
        res.send(todo)
    } catch (err) {
        console.err(err)
        res.send(err)
    }
}

exports.updateTodo = async (req, res) => {
    try {
        let todo = req.todo.toJSON()
        let newValues = req.body
        for (var key in newValues) {
            todo[key] = newValues[key]
        }
        let updatedTodo = await TodoAccess.updateTodo(todo)
        res.send(updatedTodo)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

// Middlewares
exports.getTodoById = async (req, res, next, id) => {
    try {
        let todo = await TodoAccess.getById(id)
        if (!todo) throw 'Not found'
        req.todo = todo
        next();
    } catch (err) {
        console.error(err)
        res.send(err)
    }
}