const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dopaminebox');

module.exports = mongoose.connection;
