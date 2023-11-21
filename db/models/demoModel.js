const mongoose = require('mongoose');
const { demoSchema } = require('../schema'); 

const DemoModel = mongoose.model('DemoModel', demoSchema);

module.exports = DemoModel;