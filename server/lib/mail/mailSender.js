const sendmail = require('sendmail')();

exports.mailOptions = {
  from: "no-reply@transpais.com",
  to: "",
  subject: "",
  html: ""
};

exports.sendMail = mailOptions => {
  sendmail(mailOptions, function (err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
    if (err) {
      throw err;
    }
  });
}

