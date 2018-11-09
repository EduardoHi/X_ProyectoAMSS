const { User } = require("./user.model");
const { accessErrorHandler } = require("../../lib/errorHandler");

async function createUser(user) {
  try {
    return await User.create(user);
  } catch (err) {
    console.error(err);
    throw accessErrorHandler(err);
  }
}

async function updateUser(user) {
  try {
    return await User.update(user, { where: { id: user.id } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
}

async function getAllUsers() {
  try {
    return await User.findAll();
  } catch (err) {
    throw accessErrorHandler(err);
  }
}

async function findById(id) {
  try {
    return await User.findOne({ where: { id } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
}

async function findByEmail(email) {
  try {
    return await User.findOne({ where: { email } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
}

async function deleteUser(id) {
  try {
    return await User.destroy({ where: { id } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
}

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  findById,
  findByEmail,
  deleteUser
};
