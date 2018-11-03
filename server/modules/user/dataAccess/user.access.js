const { User } = require("../models/user.model");
const { accessErrorHandler } = require("../../../lib/errorHandler");

exports.createUser = async user => {
  try {
    return await User.create(user);
  } catch (err) {
    console.error(err);
    throw accessErrorHandler(err);
  }
};

exports.updateUser = async user => {
  try {
    return await User.update(user, { where: { id: user.id } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
};

exports.getAllUsers = async () => {
  try {
    return await User.findAll();
  } catch (err) {
    throw accessErrorHandler(err);
  }
};
