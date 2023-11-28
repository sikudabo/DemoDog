const express = require('express');
const router = express.Router();
const { StartupCompaniesModel } = require('../db/models');

router.route('/api/add-startup-company-view').post(async (req, res) => {
    const { _id, organizationId } = req.body;

    try {
        const { profileViews } = await StartupCompaniesModel.findOne({ _id });
        console.log('The profile views are:', profileViews);
        if (typeof profileViews !== 'undefined' && profileViews.length > 0 && typeof profileViews.find(view => view.toString() === organizationId) !== 'undefined') {
            res.status(200).send('Already viewed profile');
            return;
        }
        await StartupCompaniesModel.updateOne({ _id }, { $push: { profileViews: organizationId }});
        res.status(200).send('Added company');
    } catch (e) {
        console.log('There was an error adding a company profile view');
        console.error(e.message);
        res.status(400).send('There was an error adding a company profile view');
    }
});

module.exports = router;