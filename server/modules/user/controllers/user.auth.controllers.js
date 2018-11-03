const UserAccess = require("../dataAccess/user.access");
const security = require("../../../lib/security");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserAccess.findByEmail(email);
    if (!user) {
      throw "There isn't an associated user to this email";
    }
    const authenticated = await security.isPasswordValid(
      password,
      user.password
    );
    if (!authenticated) {
      throw "Invalid password";
    }
    const token = await security.signToken(user);
    res.header("token", token);
    res.send({ token, user });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};
