const Trip = require("./trip.model");
const { User } = require("../user/user.model");
const Driver = require("../driver/driver.model");
const { accessWithTry } = require("../../lib/errorHandler");

const { Op } = require("sequelize");

const includeDriverAndUser = [
  {
    model: User,
    as: "user",
    attributes: ["id", "name"]
  },
  {
    model: Driver,
    as: "driver",
    attributes: ["id", "name"]
  }
];

async function createTrip(trip) {
  return await accessWithTry(Trip.create(trip));
}

async function updateTrip(trip) {
  return await accessWithTry(Trip.update(trip, { where: { id: trip.id } }));
}

async function getAllTrips() {
  return await accessWithTry(Trip.findAll());
}

async function getAllRequestedTrips() {
  return await accessWithTry(
    Trip.findAll({
      where: {
        status: "requested"
      },
      include: includeDriverAndUser
    })
  );
}

async function getAllCustomerTripsWithStatus(userId, status, order) {
  const statusOr = status.map(s => {
    return { status: s };
  });
  return await accessWithTry(
    Trip.findAll({
      where: {
        [Op.or]: statusOr,
        userId: userId
      },
      order: [[order, "DESC"]],
      include: includeDriverAndUser
    })
  );
}

async function getAllDriverTripsWithStatus(userId, status, order) {
  const statusOr = status.map(s => {
    return { status: s };
  });
  return await accessWithTry(
    Trip.findAll({
      where: {
        [Op.or]: statusOr,
        driverId: userId
      },
      order: [[order, "DESC"]],
      include: includeDriverAndUser
    })
  );
}

async function findById(id) {
  return await accessWithTry(
    Trip.findOne({ where: { id }, include: includeDriverAndUser })
  );
}

async function deleteTrip(id) {
  return await accessWithTry(Trip.destroy({ where: { id } }));
}

module.exports = {
  createTrip,
  updateTrip,
  getAllTrips,
  getAllRequestedTrips,
  getAllCustomerTripsWithStatus,
  getAllDriverTripsWithStatus,
  findById,
  deleteTrip
};
