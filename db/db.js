const mongoose = require('mongoose');

const dbUri = process.dotenv.DB_URI;

async function startDb() {
    mongoose.connect(dbUri);
}

module.exports = () => startDb();