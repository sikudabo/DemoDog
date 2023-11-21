const mongoose = require('mongoose');
const { demoSchema } = require('../schemas'); 

const DemoModel = mongoose.model('DemoModel', demoSchema);

module.exports = DemoModel;