const UserAccess = require("./user.access");
const security = require("../../lib/security");
const ErrorEnum = require("../../lib/enums/error");
const mailSender = require("../../lib/mail/mailSender");

async function login(req, res) {
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
}

async function recoverPassword(req, res) {
  let mailOptions = mailSender.mailOptions;
  let tempPass = Math.random()
    .toString(36)
    .substring(2, 15);
  mailOptions.to = req.body.email;
  mailOptions.subject = "Restablecimiento de Contraseña";

  try {
    let user = await UserAccess.findByEmail(req.body.email);

    if (!user) {
      throw ErrorEnum.NO_USER_FOUND_WITH_MAIL;
    }

    res.render(
      "recoverPassword",
      {
        title: mailOptions.subject,
        newPassword: tempPass
      },
      (err, html) => {
        mailOptions.html = html;
      }
    );

    user = user.toJSON();

    user.password = await security.hashPassword(tempPass);

    await UserAccess.updateUser(user)
    mailSender.sendMail(mailOptions);
    res.send("Correo enviado con éxito");
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

module.exports = { login, recoverPassword };
