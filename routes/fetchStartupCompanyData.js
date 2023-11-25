const express = require('express');
const router = express.Router();
const { DemoModel, EmployeeModel, StartupCompaniesModel } = require('../db/models');

router.route('/api/fetch-startup-profile-data/:_id').get(async (req, res) => {
    console.log('Being hit');
    const { _id } = req.params;

    try {
        const startupCompanyData = await StartupCompaniesModel.findOne({ _id });
        const demos = await DemoModel.find({ companyId: _id });
        const employees = await EmployeeModel.find({ companyId: _id });
        console.log('Employees are:', employees);
        res.status(200).json({ isSuccess: true, message: 'Fetched startup company data', startupCompanyData, demos, employees });
        return
    } catch(e) {
        console.log('There was an error fetching the startup company data.');
        console.error(e.message);
        res.status(500).json({ isSuccess: false, message: e.message });
    }
});

module.exports = router;