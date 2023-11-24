const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const router = express.Router();
const { EmployeeModel } = require('../db/models');

router.route('/api/update-employee').post(async (req, res) => {
    const { firstName, lastName, companyId, email, jobTitle, linkedIn, password, _id } = req.body;

    try {
        const emailExists = await EmployeeModel.findOne({ email });
        if (emailExists && _id !== emailExists._id.toString()) {
            res.status(400).json({
                isSuccess: false,
                message: 'That email exists! Please select another.',
            });
            return;
        }

        await EmployeeModel.updateOne({ _id }, { $set: { firstName, lastName, companyId, email, jobTitle, linkedIn, password } });
        const newEmployee = await EmployeeModel.findOne({ _id });

        res.status(200).json({
            isSuccess: true,
            message: 'Account successfully updated!',
            user: newEmployee,
        });
    } catch (e) {
        console.log('There was an error updating your account!');
        console.error(e.stack);
        res.status(500).json({
            isSuccess: false,
            message: 'There was an updating your account! Please try again.',
        });
    }
});

module.exports = router;