const express = require('express');
const router = express.Router();
const { StartupCompaniesModel } = require('../db/models');

router.route('/api/update-company').post(async (req, res) => {
    const { category, companyEmail, companyName, companyUrl, description, _id } = req.body;

    try {
        await StartupCompaniesModel.updateOne({ _id }, { $set: { category, companyEmail, companyName, companyUrl, description } });
        const newCompany = await StartupCompaniesModel.findOne({ _id });

        res.status(200).json({
            isSuccess: true,
            message: 'Company successfully updated!',
            company: newCompany,
        });
    } catch (e) {
        console.log('There was an error updating a company!');
        console.error(e.stack);
        res.status(500).json({
            isSuccess: false,
            message: 'There was an updating your company! Please try again.',
        });
    }
});

module.exports = router;