const Driver = require("../models/driver.model");
const { accessErrorHandler } = require("../../../lib/errorHandler");

exports.createDriver = async driver => {
  try {
    return await Driver.create(driver);
  } catch (err) {
    throw accessErrorHandler(err);
  }
};

exports.updateDriver = async driver => {
  try {
    return await Driver.update(driver, { where: { id: driver.id } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
};

exports.getAllDrivers = async () => {
  try {
    return await Driver.findAll();
  } catch (err) {
    throw accessErrorHandler(err);
  }
};
