const User = require("../models/user.model");

exports.createUser = user => {
  return User.create(user);
};

exports.updateUser = user => {
  return User.update(user, { where: { id: user.id } });
};

exports.getAllUsers = () => {
  return User.findAll();
};
