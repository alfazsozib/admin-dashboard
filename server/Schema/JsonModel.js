const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mongooseSchema = new Schema({
  jsonFile: {
    type: String,
  }

});

const JsonModel = mongoose.model('JsonModel', mongooseSchema);

module.exports = JsonModel;