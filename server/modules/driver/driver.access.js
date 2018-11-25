const Driver = require("./driver.model");
const { accessErrorHandler, accessWithTry } = require("../../lib/errorHandler");

async function createDriver(driver) {
  return await accessWithTry(Driver.create(driver));
}

async function updateDriver(driver) {
  return await accessWithTry(
    Driver.update(driver, { where: { id: driver.id } })
  );
}

async function getAllDrivers() {
  return await accessWithTry(Driver.findAll());
}

async function getById(id) {
  return await accessWithTry(Driver.findOne({ where: { id } }));
}

async function findByEmail(email) {
  return await accessWithTry(Driver.findOne({ where: { email } }));
}

async function deleteDriver(id) {
  return await accessWithTry(Driver.destroy({ where: { id } }));
}

module.exports = {
  createDriver,
  updateDriver,
  getAllDrivers,
  getById,
  deleteDriver,
  findByEmail
};
