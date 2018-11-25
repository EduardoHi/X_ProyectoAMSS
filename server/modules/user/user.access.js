const { User } = require("./user.model");
const { accessWithTry } = require("../../lib/errorHandler");

async function createUser(user) {
  return await accessWithTry(User.create(user));
}

async function updateUser(user) {
  return await accessWithTry(User.update(user, { where: { id: user.id } }));
}

async function getAllUsers() {
  return await accessWithTry(User.findAll());
}

async function findById(id) {
  return await accessWithTry(User.findOne({ where: { id } }));
}

async function findByEmail(email) {
  return await accessWithTry(User.findOne({ where: { email } }));
}

async function deleteUser(id) {
  return await accessWithTry(User.destroy({ where: { id } }));
}

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  findById,
  findByEmail,
  deleteUser
};
