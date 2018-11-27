const DriverAccess = require("./driver.access");
const security = require("../../lib/security");
const ErrorEnum = require("../../lib/enums/error");
const mailSender = require("../../lib/mail/mailSender");

async function login(req, res) {
  const { email, password } = req.body;
  try {
    let driver = await DriverAccess.findByEmail(email);
    if (!driver) {
      throw ErrorEnum.NO_ACCOUNT;
    }

    const authenticated = await security.isPasswordValid(
      password,
      driver.password
    );

    if (!authenticated) {
      throw ErrorEnum.INCORRECT_PASSWORD;
    }

    const token = await security.signToken(driver);
    res.header("token", token);
    res.send({ token, driver });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

recoverPassword = async (req, res) => {
  let mailOptions = mailSender.mailOptions;
  let tempPass = Math.random()
    .toString(36)
    .substring(2, 15);

  mailOptions.to = req.body.email;
  mailOptions.subject = "Restablecimiento de Contraseña";

  try {
    let driver = await DriverAccess.findByEmail(req.body.email);

    if (!driver) {
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

    driver = driver.toJSON();

    driver.password = await security.hashPassword(tempPass);

    driver = await DriverAccess.updateDriver(driver);
    mailSender.sendMail(mailOptions);
    res.send("Correo enviado con éxito");
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

module.exports = { login, recoverPassword };
