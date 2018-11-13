const DriverAccess = require("./driver.access");
const security = require("../../lib/security");
const ErrorEnum = require("../../lib/enums/error");
const mailSender = require("../../lib/mailSender");

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

  const options = new mailOptions()
    .setTo(req.body.email)
    .setSubject("Reestablecimiento de contraseña")
    .setText(`La contraseña temporal de acceso es ${tempPass}`)
    .toOptions();

  try {
    let driver = await DriverAccess.findByEmail(req.body.email);

    if (!driver) {
      throw ErrorEnum.NO_USER_FOUND_WITH_MAIL;
    }

    driver = driver.toJSON();

    driver.password = await security.hashPassword(tempPass);

    driver = await DriverAccess.updateDriver(driver);
    mailSender.sendMail(options);
    res.send("Correo enviado con éxito");
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

module.exports = { login, recoverPassword };
