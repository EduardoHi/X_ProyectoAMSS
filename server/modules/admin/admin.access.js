const Admin = require("./admin.model");
const { accessErrorHandler } = require("../../lib/errorHandler");

async function createAdmin(admin) {
  return await accessWithTry(Admin.create(admin));
}

async function updateAdmin(admin) {
  return await accessWithTry(Admin.update(admin, { where: { id: admin.id } }));
}

async function findByEmail(email) {
  return await accessWithTry(Admin.findOne({ where: { email } }));
}

module.exports = { createAdmin, updateAdmin, findByEmail };
