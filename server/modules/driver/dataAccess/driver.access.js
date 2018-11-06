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

exports.getById = async id => {
  try {
    return await Driver.findOne({ where: { id } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
};

exports.deleteDriver = async id => {
  try {
    return await Driver.destroy({ where: { id } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
};
