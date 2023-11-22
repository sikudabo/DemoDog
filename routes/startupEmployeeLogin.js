const express = require('express');
const router = express.Router();
const { EmployeeModel } = require('../db/models');

router.route('/api/login-startup-employee').post(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await EmployeeModel.findOne({ email });
        if (!user) {
            res.status(400).json({
                isSuccess: false,
                message: 'That email does not exist! Please try again.',
            });
            return;
        }

        if (user.password !== password) {
            res.status(400).json({
                isSuccess: false,
                message: 'That password is incorrect! Please try again.',
            });
            return;
        }

        res.status(200).json({
            isSuccess: true,
            message: `Welcome back ${user.firstName}! We hope you enjoy your startup experience!`,
            user,
        });

        return;
    } catch (e) {
        console.log('There was an error logging in a startup employee!');
        console.error(e.stack);
        res.status(500).json({
            isSuccess: false,
            message: 'There was an error logging you in! Please try again.'
        });
    }
});

module.exports = router;