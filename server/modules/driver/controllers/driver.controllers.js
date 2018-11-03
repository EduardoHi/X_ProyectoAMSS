const DriverAccess = require("../dataAccess/driver.access");

exports.createDriver = async (req, res) => {
  try {
    let driver = await DriverAccess.createDriver(req.body);
    res.send(driver);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await DriverAccess.getAllDrivers();
    res.send(drivers);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

exports.getDriver = async (req, res) => {
  try {
    let driver = req.driver;
    res.send(driver);
  } catch (err) {
    console.err(err);
    res.status(400).send(err);
  }
};

exports.updateDriver = async (req, res) => {
  try {
    let driver = req.driver.toJSON();
    let newValues = req.body;
    for (var key in newValues) {
      driver[key] = newValues[key];
    }
    let updatedDriver = await DriverAccess.updateDriver(driver);
    res.send(updatedDriver);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getDriverById = async (req, res, next, id) => {
  try {
    let driver = await DriverAccess.getById(id);
    if (!driver) throw "Not found";
    req.driver = driver;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};
