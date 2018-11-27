const TripAccess = require("./trip.access");
const DriverAccess = require("../driver/driver.access");
const ErrorEnum = require("../../lib/enums/error");

async function createTrip(req, res) {
  try {
    const trip = { ...req.body, status: "requested", userId: req.user.id };
    let newTrip = await TripAccess.createTrip(trip);
    res.send(newTrip);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function getAllTripRequests(req, res) {
  try {
    const trips = await TripAccess.getAllTripsWhere({ status: "requested" });
    res.send(trips);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function getAllTrips(req, res) {
  try {
    const trips = await TripAccess.getAllTrips();
    res.send(trips);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function getTrip(req, res) {
  try {
    let trip = req.trip;
    res.send(trip);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function getTripWithDrivers(req, res) {
  try {
    const drivers = await DriverAccess.getAllDrivers();
    res.send({ drivers, trip: req.trip });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function updateTrip(req, res) {
  try {
    let trip = req.trip.toJSON();
    let newValues = req.body;
    for (var key in newValues) {
      trip[key] = newValues[key];
    }
    let updatedTrip = await TripAccess.updateTrip(trip);
    res.send(updatedTrip);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function deleteTrip(req, res) {
  try {
    let { id } = req.trip.toJSON();
    await TripAccess.deleteTrip(id);
    res.send({});
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function getTripById(req, res, next, id) {
  try {
    let trip = await TripAccess.findById(id);
    if (!trip) throw ErrorEnum.GENERIC;
    req.trip = trip;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

module.exports = {
  createTrip,
  getAllTrips,
  getAllTripRequests,
  getTrip,
  getTripWithDrivers,
  updateTrip,
  deleteTrip,
  getTripById
};
