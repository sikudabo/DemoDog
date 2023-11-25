const express = require('express');
const router = express.Router();
const { DemoModel, EmployeeModel, StartupCompaniesModel } = require('../db/models');

router.route('/api/fetch-startup-company-data/:_id').get((req, res) => {
    const { _id } = req.params;

    try {
        const startupCompanyData = StartupCompaniesModel.findOne({ _id });
        const demos = DemoModel.find({ companyId: _id });
        const employees = EmployeeModel.find({ companyId: _id });
        res.status(200).json({ isSuccess: true, message: 'Fetched startup company data', startupCompanyData, demos, employees });
        return
    } catch(e) {
        console.log('There was an error fetching the startup company data.');
        console.error(e.message);
        res.status(500).json({ isSuccess: false, message: e.message });
    }
});

module.exports = router;