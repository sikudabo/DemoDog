const express = require('express');
const router = express.Router();
const { StartupCompaniesModel } = require('../db/models');

router.route('/api/fetch-company-data/:companyId').get(async (req, res) => {
    const companyId = req.params.companyId;
    console.log('I am being hit');
    
    try {
        const company = await StartupCompaniesModel.findOne({ _id: companyId });
        console.log('Fetched company:', company);
        res.status(200).json({ company})
    } catch (err) {
        console.error('There was an error fetching a company:',  err.message);
        res.status(500).send('There was an error fetching company data');
        return;
    }
});

module.exports = router;   