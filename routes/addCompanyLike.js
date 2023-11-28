const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { StartupCompaniesModel } = require('../db/models');

router.route('/api/add-company-like').post(async (req, res) => {
    const { _id, organizationId } = req.body;
    const sanitizedId = mongoose.Types.ObjectId(organizationId);
    
    try {
        const { inLikes } = await StartupCompaniesModel.find({ _id });
        console.log('The inLikes are:', inLikes);
        if (typeof inLikes !== 'undefined' && typeof inLikes.find(like => like === sanitizedId) !== 'undefined') {
            res.status(400).json({ isSuccess: 'false', message: 'Already liked' });
        } else {
            await StartupCompaniesModel.updateOne({ _id }, { $addToSet: { inLikes: organizationId } });
            await StartupCompaniesModel.updateOne({ _id }, { $inc: { likes: 1 } });
            res.status(200).json({ isSuccess: true, message: 'Liked' });
        }
    }
    catch(e) {
        console.log('There was an error adding a like');
        console.error(e.message);
        res.status(500).json({ isSuccess: 'false', message: e.message });
    }
});

module.exports = router;