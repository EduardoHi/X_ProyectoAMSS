var express = require("express");
var router = express.Router();

const userAuthController = require("../controllers/user.auth.controllers");

const MODULE_PATH = "/auth-user";

router.route(MODULE_PATH + "/").post(userAuthController.login);
router.route(MODULE_PATH + "/recoverPassword").post(userAuthController.recoverPassword);

module.exports = router;
