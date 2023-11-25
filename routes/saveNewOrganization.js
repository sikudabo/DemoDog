const express = require('express');
const router = express.Router();
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv').config();
const { OrganizationModel } = require('../db/models');

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

router.route('/api/save-new-organization').put(uploads.single('avatar'), async (req, res) => {
    const { email, name, password } = req.body;
    const avatar = req.file.filename;

    try {
        if (await OrganizationModel.findOne({ email })) {
            res.status(400).json({
                isSuccess: false,
                message: 'That email exists! Please select another.',
            });
            return;
        } else if (await OrganizationModel.findOne({ name })) {
            res.status(400).json({
                isSuccess: false,
                message: 'That name exists! Please select another.',
            });
            return;
        }

        const newOrganization = new OrganizationModel({
            avatar,
            email,
            name,
            password,
        });
        await newOrganization.save();
        res.status(200).json({
            isSuccess: true,
            message: 'Organization account successfully created!',
            organization: newOrganization,
        });
    } catch (e) {
        console.log('There was an error saving a new organization!');
        console.error(e.stack);
        res.status(500).json({
            isSuccess: false,
            message: 'There was an error saving a new organization! Please try again.',
        });
    }
});

module.exports = router;