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

conn.once('open', async () => {
    // Init Stream
    gfs = await Grid(conn.db, mongoose.mongo);
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

router.route('/api/save-new-company').put(uploads.single('avatar'), async (req, res) => {
    const { category, companyEmail, companyName, companyUrl, description } = req.body;
    const avatar = req.file.filename;

    try {
        const companyNameIsTaken = await StartupCompaniesModel.findOne({ companyName });
        if (companyNameIsTaken) {
            console.log('Someone tried to save a new company with a duplicate name.');
            return res.status(400).json({ isSuccess: false, message: 'Someone tried to save a new company with a duplicate name.', nameIsTaken: true });
        }

        const newCompany = {
            avatar,
            category,
            companyEmail,
            companyName,
            companyUrl,
            description,
            demos: [],
        };

        await StartupCompaniesModel.saveOne(newCompany);
        const { _id: companyId } = await StartupCompaniesModel.findOne({ companyName });
        return res.status(200).json({ isSuccess: true, message: 'New company added successfully.', companyId });
    } catch(e) {
        console.log('There was a an error saving a new company!');
        console.error(e.stack);
        res.status(500).json({ isSuccess: false, message: 'There was a an error saving a new company!' });
    }
});

module.exports = router;
