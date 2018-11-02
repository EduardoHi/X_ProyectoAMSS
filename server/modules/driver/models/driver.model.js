const Sequelize = require("sequelize");
const sequelizeConnection = require("../../../lib/sequelize");
const { UserSchema, UserOptions } = require("../../user/models/user.model");

const DriverSchema = Object.assign(UserSchema, {
  // Fields that are only for the driver
  taxiNumber: {
    type: Sequelize.NUMERIC
  }
});

const Driver = sequelizeConnection.define("driver", DriverSchema, UserOptions);

Driver.prototype.toJSON = function() {
  var values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

Driver.sync();

module.exports = Driver;
