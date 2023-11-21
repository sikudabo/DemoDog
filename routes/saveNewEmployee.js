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

router.route('/api/save-new-employee').put(uploads.single('avatar'), async (req, res) => {
    const { firstName, lastName, companyId, email, jobTitle, linkedIn, password, role, username } = req.body;
    const avatar = req.file.filename;

    try {
        const userNameExists = await EmployeeModel.findOne({ username });
        if (userNameExists) {
            res.status(400).json({
                isSuccess: false,
                message: 'Username already exists!'
            });
            return;
        }
        const newEmployee = new EmployeeModel({
            firstName,
            lastName,
            avatar,
            companyId,
            email,
            jobTitle,
            linkedIn,
            password,
            role,
            username
        });

        await newEmployee.save();

        res.status(200).json({
            isSuccess: true,
            message: 'User account successfully created!',
            user: newEmployee,
        });
    } catch (e) {
        console.log('There was an error saving a new employee!');
        console.error(e.stack);
        res.status(500).json({
            isSuccess: false,
            message: 'There was an error saving a new employee!'
        });
    }
});

module.exports = router;