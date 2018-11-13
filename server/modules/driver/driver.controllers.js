const DriverAccess = require("./driver.access");

async function createDriver(req, res) {
  try {
    let driver = await DriverAccess.createDriver(req.body);
    res.send(driver);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function adminCreateDriver(req, res) {
  try {
    let newDriver = { ...req.body, password: "password" };
    let driver = await DriverAccess.createDriver(newDriver);
    res.send(driver);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function getAllDrivers(req, res) {
  try {
    const drivers = await DriverAccess.getAllDrivers();
    res.send(drivers);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function getDriver(req, res) {
  try {
    let driver = req.driver;
    res.send(driver);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function updateDriver(req, res) {
  try {
    let driver = req.driver.toJSON();
    let newValues = req.body;
    for (var key in newValues) {
      driver[key] = newValues[key];
    }
    let updatedDriver = await DriverAccess.updateDriver(driver);
    res.send(updatedDriver);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function deleteDriver(req, res) {
  try {
    let { id } = req.driver.toJSON();
    await DriverAccess.deleteDriver(id);
    res.send({});
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function getDriverById(req, res, id) {
  try {
    let driver = await DriverAccess.getById(id);
    if (!driver) throw "Not found";
    req.driver = driver;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

module.exports = {
  createDriver,
  deleteDriver,
  adminCreateDriver,
  getAllDrivers,
  getDriver,
  getDriverById,
  updateDriver
};
