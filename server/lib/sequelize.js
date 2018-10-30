const Sequelize = require('sequelize');

const sequelizeConnection = new Sequelize(
    'transpais', // database
    'root', // username
    '', // password
    {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

sequelizeConnection.authenticate()
    .then(() => console.log('Connection has been established successfully'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelizeConnection