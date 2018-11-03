const UserAccess = require("../dataAccess/user.access");

exports.createUser = async (req, res) => {
  try {
    let user = await UserAccess.createUser(req.body);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserAccess.getAllUsers();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    let user = req.user;
    res.send(user);
  } catch (err) {
    console.err(err);
    res.status(400).send(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    let user = req.user.toJSON();
    let newValues = req.body;
    for (var key in newValues) {
      user[key] = newValues[key];
    }
    let updatedUser = await UserAccess.updateUser(user);
    res.send(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getUserById = async (req, res, next, id) => {
  try {
    let user = await UserAccess.getById(id);
    if (!user) throw "Not found";
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};
