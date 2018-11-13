var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: ""
  }
});

class mailOptions {
  constructor() {
    this.from = "";
    this.to = "";
    this.subject = "";
    this.text = "";
  }
  setFrom(from) {
    this.from = from;
    return this;
  }
  setTo(to) {
    this.to = to;
    return this;
  }
  setSubject(subject) {
    this.subject = subject;
    return this;
  }
  setText(text) {
    this.text = text;
    return this;
  }

  toOptions() {
    return { from, to, subject, text };
  }
}

function sendMail(mailOptions) {
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      throw error;
    }
  });
}
