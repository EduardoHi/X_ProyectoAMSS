var express = require("express");
var router = express.Router();

const adminController = require("./admin.controllers");

const MODULE_PATH = "/admin";

router.route(MODULE_PATH + "/:adminId").put(adminController.updateAdmin);

router.param("adminId", adminController.getAdminById);

module.exports = router;
