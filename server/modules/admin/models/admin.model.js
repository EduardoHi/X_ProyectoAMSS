const sequelizeConnection = require("../../../lib/sequelize");
const { UserSchema, UserOptions } = require("../../user/models/user.model");

const Admin = sequelizeConnection.define("admin", UserSchema, UserOptions);

Admin.prototype.toJSON = function() {
  var values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

Admin.sync();

module.exports = Admin;
