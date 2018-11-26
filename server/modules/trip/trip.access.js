const Trip = require("./Trip.model");
const { User } = require("../user/user.model");
const { accessWithTry } = require("../../lib/errorHandler");

async function createTrip(trip) {
  return await accessWithTry(Trip.create(trip));
}

async function updateTrip(trip) {
  return await accessWithTry(Trip.update(trip, { where: { id: trip.id } }));
}

async function getAllTrips() {
  return await accessWithTry(Trip.findAll());
}

async function getAllTripsWhere(query) {
  return await accessWithTry(Trip.findAll({ where: query }));
}

async function findById(id) {
  return await accessWithTry(Trip.findOne({ where: { id } }));
}

async function deleteTrip(id) {
  return await accessWithTry(Trip.destroy({ where: { id } }));
}

module.exports = {
  createTrip,
  updateTrip,
  getAllTrips,
  getAllTripsWhere,
  findById,
  deleteTrip
};
