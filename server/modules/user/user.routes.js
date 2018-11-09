var express = require("express");
var router = express.Router();

const userController = require("./user.controllers");

const MODULE_PATH = "/user";

router
  .route(MODULE_PATH + "/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route(MODULE_PATH + "/:userId")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.route(MODULE_PATH + "/create").post(userController.adminCreateUser);

router.param("userId", userController.getUserById);

module.exports = router;
