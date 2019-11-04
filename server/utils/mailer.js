require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ecommerce.danielmark@gmail.com',
    pass: process.env.mailerPass
  }
});

exports.sendEmailNotification = function(recipient, subject, text) {
  const mailOptions = {
    from: 'ECOMMERCE <ecommerce.danielmark@gmail.com>',
    to: recipient,
    subject: subject,
    text: text
  };

  // TEMPLATING
  // https://stackoverflow.com/questions/39489229/pass-variable-to-html-template-in-nodemailer

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
