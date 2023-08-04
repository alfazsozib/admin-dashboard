
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mongooseSchema2 = new Schema({
  jsonFile: {
    type: String,
  }

});

const JsonModel2 = mongoose.model('JsonModel2', mongooseSchema2);

module.exports = JsonModel2;