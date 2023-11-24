const express = require('express');
const router = express.Router();
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv').config();
const { DemoModel } = require('../db/models');

const dbUri = dotenv.parsed.DB_URI;

var conn = mongoose.createConnection(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;

let gridfsBucket

conn.once('open', async () => {
    // Init Stream
    gfs = await Grid(conn.db, mongoose.mongo);
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads',
    });
    gfs.collection('uploads');
    return 'done';
});

const storage = new GridFsStorage({
    url: dbUri,
    file: async (req, file) => {
      return await new Promise((resolve) => {
          const filename = Date.now() + "-" + file.fieldname + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
    }
});

router.route('/api/delete-demo/:demoId/:videoId').delete(async (req,res) => {
    const { demoId, videoId } = req.params;

    try {
        await DemoModel.deleteOne({ _id: demoId });

        if (videoId) {
            const { _id: id } = await gfs.files.findOne({ filename: videoId });
            await gridfsBucket.delete(id);
        }

        res.status(200).json({ isSuccess: true, message: 'Demo deleted successfully' });
    } catch(e) {
        res.status(500).json({ isSuccess: false, message: 'Error deleting demo' });
    }
});

module.exports = router;