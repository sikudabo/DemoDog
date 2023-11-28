const express = require('express');
const router = express.Router();
const { StartupCompaniesModel } = require('../db/models');

router.route('/add-startup-company-view').post(async (req, res) => {
    const { _id, organizationId } = req.body;

    try {
        await StartupCompaniesModel.updateOne({ _id }, { $push: { organizationId: organizationId }});
        res.status(200).send('Added new profile view');
    } catch (e) {
        console.log('There was an error adding a company profile view');
        console.error(e.message);
        res.status(400).send('There was an error adding a company profile view');
    }
});

module.exports = router;