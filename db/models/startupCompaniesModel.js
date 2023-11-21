const mongoose = require('mongoose');
const { startupCompaniesSchema } = require('../schemas'); 

const StartupCompaniesModel = mongoose.model('StartupCompaniesModel', startupCompaniesSchema);
module.exports = StartupCompaniesModel;