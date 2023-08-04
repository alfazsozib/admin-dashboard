const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "testavaliable0@gmail.com",
    pass: "ghqnxlikukqthuqn"
  }
});

module.exports = transporter