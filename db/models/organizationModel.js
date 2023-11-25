const mongoose = require('mongoose');
const { organizationSchema } = require('../schemas');

const OrganizationModel = mongoose.model('OrganizationModel', organizationSchema);

module.exports = OrganizationModel;