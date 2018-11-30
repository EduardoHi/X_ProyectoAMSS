const Sequelize = require("sequelize");
const sequelizeConnection = require("../../lib/sequelize");
const { User } = require("../user/user.model");
const Driver = require("../driver/driver.model");

const TripSchema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: Sequelize.UUID,
    references: {
      model: User,
      id: "id"
    },
    allowNull: false
  },
  driverId: {
    type: Sequelize.UUID,
    references: {
      model: Driver,
      id: "id"
    }
  },
  originLat: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  originLng: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  destinationLat: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  destinationLng: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM,
    values: ["requested", "accepted", "started", "finished", "canceled"],
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
};

const TripOptions = {
  paranoid: true
};

const Trip = sequelizeConnection.define("trip", TripSchema, TripOptions);

Trip.sync();

module.exports = Trip;
