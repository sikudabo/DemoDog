const express = require('express');
const router = express.Router();
const { DemoModel } = require('../db/models');

router.route('/api/fetch-demo/:videoId').get(async (req, res) => {
    const { videoId } = req.params;

    try {
        const demo = await DemoModel.findOne({ videoId });
        res.status(200).json({ isSuccess: true, message: 'Video successfully fetched!', demo });
    } catch (e) {
        console.log('There was an error fetching a demo!');
        console.error(e.message);
        res.status(500).json({ isSuccess: false, message: 'There was an error fetching a demo!' });
    }
});

module.exports = router;
