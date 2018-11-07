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
    try {
        let err;
        transporter.sendMail(mailOptions, function (error, info) {
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
}