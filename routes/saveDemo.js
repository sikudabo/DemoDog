const express = require('express');
const router = express.Router();
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { DemoModel } = require('../db/models');

const dbUri = process.env.DB_URI;

var conn = mongoose.createConnection(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});

let gfs;

conn.once('open', async () => {
    // Init Stream
    gfs = await Grid(conn.db, mongoose.mongo);
    await gfs.collection('uploads');
    return 'done';
});

const storage = new GridFsStorage({
    url: dbUri,
    file: async (req, file) => {
      return await new Promise((resolve, reject) => {
          const filename = Date.now() + "-" + file.fieldname + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
    }
});

const uploads = multer({ storage });

router.route('/api/save-new-demo').put(uploads.single('demo'), async (req, res) => {
    const { companyId, demoName, description, private, uploaderId, uploaderName, videoCategory } = req.body;
    const demo = req.file.filename;

    try {
        const newDemo = new DemoModel({
            companyId: companyId,
            demoName: demoName,
            description: description,
            private: private,
            uploaderId: uploaderId,
            uploaderName: uploaderName,
            videoCategory: videoCategory,
            videoId: demo,
        });
        newDemo.save();

        const fetchedVideos = DemoModel.find({ companyId });
        res.status(200).send({ isSuccess: true, message: 'New demo successfully saved!', fetchedVideos });
    } catch(err) {
        console.error('Error saving new demo', err.message);
        res.status(500).send({ isSuccess: false, message: 'There was an error saving the new demo! Please try again.' });
    }
});

module.exports = router;