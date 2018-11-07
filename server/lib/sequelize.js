const Sequelize = require("sequelize");
const { database, dropAndCreate } = require("./config");

const sequelizeConnection = new Sequelize(
  database.name,
  database.username,
  database.password,
  {
    host: database.host,
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelizeConnection
  .authenticate()
  .then(() => console.log("Connection has been established successfully"))
  .catch(err => console.error("Unable to connect to the database:", err));

if (dropAndCreate) {
  sequelizeConnection
    .sync({ force: dropAndCreate })
    .then(() => {
      require("../lib/dataInit");
    })
    .catch(err => console.error(err));
}

module.exports = sequelizeConnection;
