const express = require('express');
const router = express.Router();
const { emailSender } = require('./utils');
const { mailOptions } = require('./constants');

router.route('/api/contact').post(async (req, res) => {
    const { email, message } = req.body;
    let options = mailOptions;
    options.subject = 'general contact';
    options.text = `Message from ${email} \nFrom DemoDog Contact Form \n ${message}`;
    emailSender.sendMail(options, (err) => {
        if (err) {
            console.log('There was an error sending a contact email');
            console.error(err.message);
            res.status(500).json({ isSuccess: false, message: 'There was an error sending that contact email' });
            return;
        }

        res.status(200).json({ isSuccess: true, message: 'Thanks for reaching out to us! We will be in touch shortly!' });
        return;
    });
});

module.exports = router;