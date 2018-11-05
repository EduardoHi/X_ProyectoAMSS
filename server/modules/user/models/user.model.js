const Sequelize = require("sequelize");
const sequelizeConnection = require("../../../lib/sequelize");
const security = require("../../../lib/security");

const UserSchema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(155),
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING(155),
    allowNull: null,
  }
};

const UserOptions = {
  paranoid: true,
  hooks: {
    beforeCreate: async (user, _options) =>
      security
        .hashPassword(user.password)
        .then(hashedPw => {
          user.password = hashedPw;
        })
        .catch(err => {
          if (err) console.log(err);
        })
  }
};

const User = sequelizeConnection.define("user", UserSchema, UserOptions);

// removing password from the user json to never send passwords to clients
User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

User.sync();

module.exports = { User, UserSchema, UserOptions };
