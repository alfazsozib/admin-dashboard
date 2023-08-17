
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mongooseSchema4 = new Schema({
  jsonFile: {
    type: String,
  }

});

const JsonModel4 = mongoose.model('JsonModel4', mongooseSchema4);

module.exports = JsonModel4;