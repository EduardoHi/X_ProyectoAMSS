const Driver = require("./driver.model");
const { accessErrorHandler } = require("../../lib/errorHandler");

async function createDriver(driver) {
  try {
    return await Driver.create(driver);
  } catch (err) {
    throw accessErrorHandler(err);
  }
}

async function updateDriver(driver) {
  try {
    return await Driver.update(driver, { where: { id: driver.id } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
}

async function getAllDrivers() {
  try {
    return await Driver.findAll();
  } catch (err) {
    throw accessErrorHandler(err);
  }
}

async function getById(id) {
  try {
    return await Driver.findOne({ where: { id } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
}

async function findByEmail(email) {
  try {
    return await Driver.findOne({ where: { email } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
}

async function deleteDriver(id) {
  try {
    return await Driver.destroy({ where: { id } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
}

module.exports = {
  createDriver,
  updateDriver,
  getAllDrivers,
  getById,
  deleteDriver,
  findByEmail
};
