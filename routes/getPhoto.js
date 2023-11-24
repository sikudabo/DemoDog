const express = require('express');
const router = express.Router();
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

const dbUri = process.env.DB_URI;

var conn = mongoose.createConnection(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});

let gfs;
let gridfsBucket;

conn.once('open', () => {
    // Init Stream
    gfs = Grid(conn.db, mongoose.mongo);
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads',
    });
    gfs.collection('uploads');
    return 'done';
});

router.route('/api/get-photo/:photo').get(async (req, res) => {
    
    const photo = req.params.photo;
    const file = await gfs.files.findOne({ filename: photo });
    
    if (!file || file.length === 0) {
        console.log('Could not find photo');
        return res.status(404).json({
            err: 'Could not find the photo!',
        });
    }

    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
});

module.exports = router;