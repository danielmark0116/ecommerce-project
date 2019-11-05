require('dotenv').config();
const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ecommerce.danielmark@gmail.com',
    pass: process.env.mailerPass
  }
});

const linkDomain =
  process.env.MODE === 'production'
    ? 'https://grychtol.com.pl'
    : 'http://localhost:3000';
const senderEmail = 'ECOMMERCE | Notification <ecommerce.danielmark@gmail.com>';

exports.orderCreate = function(recipient, subject, data) {
  const mailOptions = {
    from: senderEmail,
    to: recipient,
    subject: subject,
    html: pug.renderFile(__dirname + '/../views/new_order.pug', {
      userName: data.userName,
      orderId: data.orderId,
      domain: linkDomain
    })
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      return null;
    }
  });
};

exports.paymentFullfill = function(recipient, subject, data) {
  const mailOptions = {
    from: senderEmail,
    to: recipient,
    subject: subject,
    html: pug.renderFile(__dirname + '/../views/payment_fullfill.pug', {
      userName: data.userName,
      orderId: data.orderId,
      domain: linkDomain
    })
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      return null;
    }
  });
};
