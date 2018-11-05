var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});

exports.mailOptions = {
    from: '',
    to: '',
    subject: '',
    text: ''
};

exports.sendMail = mailOptions => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return error;
        } else {
            return 'Correo enviado a: ' + info.response;
        }
    });

}