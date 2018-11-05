const UserAccess = require("../dataAccess/user.access");
const security = require("../../../lib/security");
const mailSender = require("../../../lib/mailSender");

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

exports.recoverPassword = async (req, res) => {
  let mailOptions = mailSender.mailOptions;
  let tempPass = Math.random().toString(36).substring(2, 15);
  mailOptions.to = req.body.email;
  mailOptions.subject = "Restablecimiento de contraseña";
  mailOptions.text = `La contraseña temporal de acceso es ${tempPass}`;

  let user = await UserAccess.findByEmail(req.body.email);
  user = user.toJSON();

  if (!user) {
    throw "No existe ningun usuario registrado con ese correo.";
  }

  user.password = await security.hashPassword(tempPass);

  try {
    UserAccess.updateUser(user).then(usr => {
      mailSender.sendMail(mailOptions);
    });
  } catch (err) {
    throw "Ocurrió un error al mandar el correo";
  }

};
