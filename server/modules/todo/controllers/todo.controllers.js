
const TodoAccess = require('../dataAccess/todo.access')


exports.createTodo = async (req, res) => {
    try {
        let todo = await TodoAccess.create(req.body)
        res.send(todo)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

exports.getAllTodos = async (req, res) => {
    try {
        let todos = await TodoAccess.getAll()
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
        await TodoAccess.update(todo)
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        let todo = req.todo.toJSON()
        await TodoAccess.delete(todo.id)
        res.sendStatus(200)
    } catch (err) {
        console.error(err)
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