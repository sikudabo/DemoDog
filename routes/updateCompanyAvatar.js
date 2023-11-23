const express = require('express');
const router = express.Router();
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv').config();
const { StartupCompaniesModel } = require('../db/models');

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

const uploads = multer({ storage });

router.route('/api/update-company-avatar').post(uploads.single('avatar'), async (req, res) => {
    const { companyId, oldAvatar } = req.body;
    const filename = req.file.filename;

    try {
        await StartupCompaniesModel.updateOne({ _id: companyId }, { $set: { avatar: filename } });

        if (oldAvatar) {
            const { _id } = await gfs.files.findOne({ filename: oldAvatar });
            await gridfsBucket.delete(_id)
        }

        const updatedCompany = await StartupCompaniesModel.findOne({ _id: companyId });
        res.status(200).json({ isSuccess: true, message: 'Company avatar successfully updated!', updatedCompany });
    } catch(e) {
        console.log(e.message);
        res.status(500).json({ isSuccess: false, message: 'There was an error updating the company avatar! Please try again.' });
    }
});

module.exports = router;