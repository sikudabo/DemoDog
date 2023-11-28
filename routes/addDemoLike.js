const express = require('express');
const router = express.Router();
const { DemoModel } = require('../db/models');

router.route('/api/add-demo-like').post(async (req, res) => {
    const { videoId } = req.body;
    const videoObjId = videoId.split('/').pop();
    await DemoModel.updateOne({ videoId: videoObjId }, { $inc: { likes: 1 } });
    res.status(200).json({ isSuccess: true, message: 'Successfully liked demo' });
});

module.exports = router;