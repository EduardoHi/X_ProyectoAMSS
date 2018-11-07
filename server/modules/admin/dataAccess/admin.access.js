const Admin = require("../models/admin.model");
const { accessErrorHandler } = require("../../../lib/errorHandler");

async function createAdmin(admin) {
  try {
    return await Admin.create(admin);
  } catch (err) {
    console.error(err);
    throw accessErrorHandler(err);
  }
}

async function updateAdmin(admin) {
  try {
    return await Admin.update(admin, { where: { id: admin.id } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
}

async function findByEmail(email) {
  try {
    return await Admin.findOne({ where: { email } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
}

export default { createAdmin, updateAdmin, findByEmail };
