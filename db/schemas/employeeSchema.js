const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String, required: true },
    companyId: String,
    createdAt: { type: Date, default: Date.now, required: true },
    email: { type: String, required: true, unique: true },
    jobTitle: { type: String, required: true },
    linkedIn: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
}, {
    collection: 'employees',
});

module.exports = employeeSchema;