const Admin = require("./admin.model");
const { accessErrorHandler, accessWithTry } = require("../../lib/errorHandler");

async function createAdmin(admin) {
  return await accessWithTry(Admin.create(admin));
}

async function updateAdmin(admin) {
  return await accessWithTry(Admin.update(admin, { where: { id: admin.id } }));
}

async function findById(id) {
  try {
    return await Admin.findOne({ where: { id } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
}

async function findByEmail(email) {
  return await accessWithTry(Admin.findOne({ where: { email } }));
}

module.exports = { createAdmin, updateAdmin, findById, findByEmail };
