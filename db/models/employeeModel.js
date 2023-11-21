const mongoose = require('mongoose');
const { employeeSchema } = require('../schemas'); 

const EmployeeModel = mongoose.model('EmployeeModel', employeeSchema);

module.exports = EmployeeModel;