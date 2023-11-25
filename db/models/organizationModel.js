const mongoose = require('mongoose');
const { organizationSchema } = require('./organizationSchema');

const OrganizationModel = mongoose.model('OrganizationModel', organizationSchema);

module.exports = OrganizationModel;