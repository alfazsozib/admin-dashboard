
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mongooseSchema3 = new Schema({
  jsonFile: {
    type: String,
  }

});

const JsonModel3 = mongoose.model('JsonModel3', mongooseSchema3);

module.exports = JsonModel3;