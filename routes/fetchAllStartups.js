const express = require('express');
const router = express.Router();
const { StartupCompaniesModel } = require('../db/models');

router.route('/api/fetch-all-startups').get(async (req, res) => {
    try {
        const startups = await StartupCompaniesModel.find({});
        res.status(200).json({  isSuccess: true, startups });
    } catch(e) {
        console.log('There was an error fetching all startup companies');
        console.error(e.message);
        res.status(500).json({  isSuccess: false, error: 'There was an error fetching the companies' });
    }
});

module.exports = router;