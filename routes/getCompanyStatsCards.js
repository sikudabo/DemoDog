const express = require('express');
const router = express.Router();
const { DemoModel, EmployeeModel, StartupCompaniesModel } = require('../db/models');

router.route('/api/get-company-stats-cards/:_id').get(async (req, res) => {
    const { _id } = req.params;
    let demoLikes = 0;
    let totalLikes = 0;
    try {
        const company = await StartupCompaniesModel.findOne({ _id });
        if (!company) {
            return res.status(404).json({ isSuccess: false, message: 'Company not found.' });
        }
        const employeeCount = await EmployeeModel.countDocuments({ companyId: _id });
        const demoCount = await DemoModel.countDocuments({ companyId: _id });
        const { likes: companyLikes, inLikes } = company;
        const demos = await DemoModel.find({ companyId: _id });
        if (demos.length > 0) {
            demoLikes = demos.reduce((a, b) => a + b.likes, 0);
        }

        if (typeof inLikes !== 'undefined') {
            totalLikes = inLikes.length;
        }

        const employees = await EmployeeModel.find({ companyId: _id });
        return res.status(200).json({ isSuccess: true, message: 'Company stats cards retrieved successfully.', companyLikes, demos, demoCount, demoLikes, totalLikes, employees, employeeCount, inLikes });
    } catch(e) {
        console.log('There was a an error retrieving company stats cards!');
        console.error(e.stack);
        res.status(500).json({ isSuccess: false, message: 'There was a an error retrieving company stats cards!' });
    }
});

module.exports = router;