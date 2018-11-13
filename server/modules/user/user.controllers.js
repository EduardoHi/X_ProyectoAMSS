const UserAccess = require("./user.access");
const ErrorEnum = require("../../lib/enums/error");

async function createUser(req, res) {
  try {
    let user = await UserAccess.createUser(req.body);
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function adminCreateUser(req, res) {
  try {
    let newUser = { ...req.body, password: "password" };
    let user = await UserAccess.createUser(newUser);
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await UserAccess.getAllUsers();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function getUser(req, res) {
  try {
    let user = req.user;
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function updateUser(req, res) {
  try {
    let user = req.user.toJSON();
    let newValues = req.body;
    for (var key in newValues) {
      user[key] = newValues[key];
    }
    let updatedUser = await UserAccess.updateUser(user);
    res.send(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function deleteUser(req, res) {
  try {
    let { id } = req.user.toJSON();
    await UserAccess.deleteUser(id);
    res.send({});
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function getUserById(req, res, next, id) {
  try {
    let user = await UserAccess.findById(id);
    if (!user) throw ErrorEnum.GENERIC;
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

module.exports = {
  createUser,
  adminCreateUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserById
};
