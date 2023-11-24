const express = require('express');
const router = express.Router();
const { DemoModel } = require('../db/models');

router.route('/api/demo-privacy-change').post(async (req, res) => {
    const { _id, isPrivate } = req.body;

    try {
        await DemoModel.updateOne({ _id }, { $set: { private: isPrivate } });
        res.status(200).json({ isSuccess: true, message: 'Demo privacy successfully updated' });
    } catch (e) {
        res.status(500).json({ isSuccess: false, message: 'There was a an error updating the demo privacy!' });
    }
});

module.exports = router;