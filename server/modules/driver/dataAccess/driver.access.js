const Driver = require("../models/driver.model");

exports.createDriver = driver => {
  return Driver.create(driver);
};

exports.updateDriver = user => {
  return Driver.update(driver, { where: { id: driver.id } });
};

exports.getAllDrivers = () => {
  return Driver.findAll();
};
