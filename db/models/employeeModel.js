const mongoose = require('mongoose');
const { employeeSchema } = require('../schema'); 

const EmployeeModel = mongoose.model('EmployeeModel', employeeSchema);

module.exports = EmployeeModel;