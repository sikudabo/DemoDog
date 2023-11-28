const mongoose = require('mongoose');

const startupCompaniesSchema = new mongoose.Schema({
    avatar: { type: String, required: true },
    category: { type: String, required: true },
    companyEmail: { type: String, required: true, unique: true },
    companyName: { type: String, required: true, unique: true },
    companyUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    demos: [String],
    description: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    inLikes: [String],
    profileViews: { type: [String], default: [], required: true },
}, 
{
    collection:'startupCompanies',
});

module.exports = startupCompaniesSchema;