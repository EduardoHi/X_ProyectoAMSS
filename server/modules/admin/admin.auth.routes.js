var express = require("express");
var router = express.Router();

const adminAuthController = require("../controllers/admin.auth.controllers");

const MODULE_PATH = "/auth-admin";

router.route(MODULE_PATH + "/").post(adminAuthController.login);
router.route(MODULE_PATH + "/recoverPassword").post(adminAuthController.recoverPassword);

module.exports = router;
