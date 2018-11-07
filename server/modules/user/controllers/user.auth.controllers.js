const UserAccess = require("../dataAccess/user.access");
const security = require("../../../lib/security");
const mailSender = require("../../../lib/mailSender");
const ErrorEnum = require("../../../lib/enums/error");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserAccess.findByEmail(email);

    if (!user) {
      throw ErrorEnum.NO_ACCOUNT;
    }

    const authenticated = await security.isPasswordValid(
      password,
      user.password
    );

    if (!authenticated) {
      throw ErrorEnum.INCORRECT_PASSWORD;
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

  try {
    let user = await UserAccess.findByEmail(req.body.email);

    if (!user) {
      throw ErrorEnum.NO_USER_FOUND_WITH_MAIL;
    }

    user = user.toJSON();

    user.password = await security.hashPassword(tempPass);

    UserAccess.updateUser(user).then(usr => {
      mailSender.sendMail(mailOptions);
    }).then(() => {
      res.send("Correo enviado con éxito");
    });

  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }

};
