const mongoose = require('mongoose');

const demoSchema = new mongoose.Schema({
    companyId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    demoName: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    videoId: { type: String, required: true },
    uploaderId: { type: String, required: true },
    uploaderName: { type: String, required: true },
    private: { type: Boolean, required: true, default: false },
    videoCategory: { type: String, required: true },
},
{
    collection: 'demos',
});

module.exports = demoSchema;