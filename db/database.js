var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/trip', { useNewUrlParser: true });

module.exports = { mongoose };