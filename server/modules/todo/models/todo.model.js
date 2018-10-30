const Sequelize = require('sequelize')
const sequelizeConnection = require('../../../lib/sequelize')

const Todo = sequelizeConnection.define('todo', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        allowNull: false,

    },
    firstLabel: {
        type: Sequelize.STRING
    },
    secondLabel: {
        type: Sequelize.STRING
    }
});

Todo.sync({ force: true }).then(() => {
    return Todo.create({
        firstLabel: 'Hello',
        secondLabel: 'World'
    });
});

module.exports = Todo