const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "", // correo que envia el mail
    pass: "" // contraseña del correo
  }
});

exports.mailOptions = {
  from: "", // correo que envía el mail
  to: "",
  subject: "",
  text: "",
  html: ""
};

exports.sendMail = mailOptions => {
  try {
    let err;
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        err = error;
      }
    });
    if (err) {
      throw err;
    }
  } catch (err) {
    return err;
  }
};
