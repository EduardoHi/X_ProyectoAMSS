var express = require("express");
var router = express.Router();

const driverAuthController = require("./driver.auth.controllers");

const MODULE_PATH = "/auth-driver";

router.route(MODULE_PATH + "/").post(driverAuthController.login);

router
  .route(MODULE_PATH + "/recoverPassword")
  .post(driverAuthController.recoverPassword);

module.exports = router;
