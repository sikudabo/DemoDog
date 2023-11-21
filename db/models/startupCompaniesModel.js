const mongoose = require('mongoose');
const { startupCompaniesSchema } = require('../schema'); 

const StartupCompaniesModel = mongoose.model('StartupCompaniesModel', startupCompaniesSchema);
module.exports = StartupCompaniesModel;