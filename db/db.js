const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// const dbUri = process.env.DB_URI;
const dbUri = dotenv.parsed.DB_URI;

async function startDb() {
    mongoose.connect(dbUri);
}

module.exports = () => startDb();