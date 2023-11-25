const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    avatar: { type: String, required: true },
    createdOn: { type: Date, default: Date.now, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    userType: { type: String, required: true },
});

module.exports = organizationSchema;