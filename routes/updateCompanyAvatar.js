const express = require('express');
const router = express.Router();
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv').config();
const { StartupCompaniesModel } = require('../db/models');

const dbUri = process.env.DB_URI;
console.log('The dbUri is: ', dbUri);

var conn = mongoose.createConnection(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
var promise = mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});

let gfs;

conn.once('open', () => {
    // Init Stream
    gfs = Grid(conn, mongoose.mongo);
    gfs.collection('uploads');
    return 'done';
});

const storage = new GridFsStorage({
    db: promise,
    url: dbUri,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
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
            const { _id } = (await gfs.files.findOne({ filename: oldAvatar })) || { _id: 'kmfdka'};
            try {
                await gfs.remove({ filename, root: 'uploads' });
            } catch (e) {
                const updatedCompany = await StartupCompaniesModel.findOne({ _id: companyId });
                res.status(200).json({ isSuccess: true, message: 'Company avatar successfully updated!', updatedCompany });
            }
        }

        const updatedCompany = await StartupCompaniesModel.findOne({ _id: companyId });
        res.status(200).json({ isSuccess: true, message: 'Company avatar successfully updated!', updatedCompany });
    } catch(e) {
        console.log(e.message);
        res.status(500).json({ isSuccess: false, message: 'There was an error updating the company avatar! Please try again.' });
    }
});

module.exports = router;