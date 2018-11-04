const AdminAccess = require("../dataAccess/admin.access");
const security = require("../../../lib/security");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let admin = await AdminAccess.findByEmail(email);
    if (!admin) {
      throw "There isn't an associated admin to this email";
    }
    const authenticated = await security.isPasswordValid(
      password,
      admin.password
    );
    if (!authenticated) {
      throw "Invalid password";
    }
    const token = await security.signToken(admin);
    res.header("token", token);
    res.send({ token, admin });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};
