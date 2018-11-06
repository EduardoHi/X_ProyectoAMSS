var express = require("express");
var router = express.Router();

const driverController = require("../controllers/driver.controllers");

const MODULE_PATH = "/driver";

router
  .route(MODULE_PATH + "/")
  .get(driverController.getAllDrivers)
  .post(driverController.createDriver);

router
  .route(MODULE_PATH + "/:driverId")
  .get(driverController.getDriver)
  .put(driverController.updateDriver)
  .delete(driverController.deleteDriver);

router.route(MODULE_PATH + "/create").post(driverController.adminCreateDriver);

router.param("driverId", driverController.getDriverById);

module.exports = router;
