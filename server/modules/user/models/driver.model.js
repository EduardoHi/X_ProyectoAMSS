const Sequelize = require("sequelize");
const sequelizeConnection = require("../../../lib/sequelize");
const { UserSchema, UserOptions } = require("./user.model");

const DriverSchema = Object.assign(UserSchema, {
  // Fields that are only for the driver
  taxiNumber: {
    type: Sequelize.NUMERIC
  }
});

const Driver = sequelizeConnection.define("driver", DriverSchema, UserOptions);

Driver.sync();

module.exports = Driver;
