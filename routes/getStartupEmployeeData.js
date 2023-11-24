const express = require('express');
const router = express.Router();
const { EmployeeModel } = require('../db/models');

router.route('/api/get-employee-data/:_id').get(async (req, res) => {
    const { _id } = req.params;

    try {
        const employeeData = await EmployeeModel.findOne({ _id });
        res.status(200).json({
            isSuccess: true,
            message: 'Employee data successfully retrieved!',
            employeeData,
        });
    } catch (e) {
        console.log('There was an error retrieving employee data!');
        console.error(e.stack);
        res.status(500).json({
            isSuccess: false,
            message: 'There was an error retrieving employee data! Please try again.',
        });
    }
});

module.exports = router;