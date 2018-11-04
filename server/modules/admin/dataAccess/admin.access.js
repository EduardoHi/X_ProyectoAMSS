const Admin = require("../models/admin.model");
const { accessErrorHandler } = require("../../../lib/errorHandler");

exports.createAdmin = async admin => {
  try {
    return await Admin.create(admin);
  } catch (err) {
    console.error(err);
    throw accessErrorHandler(err);
  }
};

exports.findByEmail = async email => {
  try {
    return await Admin.findOne({ where: { email } });
  } catch (err) {
    throw accessErrorHandler(err);
  }
};
