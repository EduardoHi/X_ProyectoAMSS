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
    .query("SET FOREIGN_KEY_CHECKS = 0")
    .then(function() {
      sequelizeConnection
        .sync({
          force: dropAndCreate
        })
        .then(() => {
          require("../lib/dataInit");
        })
        .then(function() {
          sequelizeConnection
            .query("SET FOREIGN_KEY_CHECKS = 1")
            .then(function() {
              console.log("Database Dropped and Created.");
            });
        })
        .catch(function(err) {
          console.error(err);
        });
    })
    .catch(function(ee) {
      console.error(err);
    });
}

module.exports = sequelizeConnection;
