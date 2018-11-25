const AdminAccess = require("./admin.access");

async function updateAdmin(req, res) {
  try {
    let admin = req.admin.toJSON();
    let newValues = req.body;
    for (var key in newValues) {
      admin[key] = newValues[key];
    }
    let updatedAdmin = await AdminAccess.updateAdmin(admin);
    res.send(updatedAdmin);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function getAdminById(req, res, next, id) {
  try {
    let admin = await AdminAccess.findById(id);
    if (!admin) throw ErrorEnum.GENERIC;
    req.admin = admin;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

module.exports = {
  updateAdmin,
  getAdminById
};
