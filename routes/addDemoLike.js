const express = require('express');
const router = express.Router();
const { DemoModel } = require('../db/models');

router.route('/api-add-demo-like').post(async (req, res) => {
    const { videoId } = req.body;
    await DemoModel.updateOne({ videoId }, { $inc: { likes: 1 } });
    res.status(200).send('Liked video');
});

module.exports = router;