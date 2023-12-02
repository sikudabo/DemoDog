const nodeMailer = require('nodemailer');

const emailSender = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.COMPANY_EMAIL_SECRET,
    }
});

module.exports = emailSender;