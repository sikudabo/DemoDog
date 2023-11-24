const express = require('express');
const router = express.Router();
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv').config();
const { EmployeeModel } = require('../db/models');

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

router.route('/api/delete-startup-employee/:_id/:avatar').delete(async (req, res) => {
    const { _id, avatar } = req.params;

    try {
        await EmployeeModel.deleteOne({ _id: _id });

        if (avatar) {
            const { _id: id } = await gfs.files.findOne({ filename: avatar });
            await gridfsBucket.delete(id);
        }

        res.status(200).json({ isSuccess: true, message: 'Employee deleted successfully' });
    } catch(e) {
        res.status(500).json({ isSuccess: false, message: 'Error deleting employee' });
    }
});

module.exports = router;