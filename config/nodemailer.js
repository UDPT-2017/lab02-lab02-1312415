const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    auth: {
        user: 'student1312415@gmail.com',
        pass: 'phan080295!'
    }
});
var sendMail = function (toEmail, title, text) {
    let mailOptions = {
        to: toEmail, // list of receivers
        subject: title, // Subject line
        text: text, // plain text body
        html: '<b>Hello world ?</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
};
sendMail("idkwayta@gmail.com","hello","mmeee");
