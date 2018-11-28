var express = require("express");
var router = express.Router();

const tripController = require("./trip.controllers");

const MODULE_PATH = "/trip";

router
  .route(MODULE_PATH + "/")
  .get(tripController.getAllTrips)
  .post(tripController.createTrip);

router.route(MODULE_PATH + "/request").get(tripController.getAllTripRequests);

router
  .route(MODULE_PATH + "/assign/:tripId")
  .get(tripController.getTripWithDrivers);

router
  .route(MODULE_PATH + "/driver-accepted")
  .get(tripController.getAllDriverAcceptedAndStartedTrips);

router
  .route(MODULE_PATH + "/customer-accepted")
  .get(tripController.getAllCustomerAcceptedAndStartedTrips);

router
  .route(MODULE_PATH + "/:tripId")
  .get(tripController.getTrip)
  .put(tripController.updateTrip)
  .delete(tripController.deleteTrip);

router.param("tripId", tripController.getTripById);

module.exports = router;
