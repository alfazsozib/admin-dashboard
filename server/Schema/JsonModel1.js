const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mongooseSchema = new Schema({
  jsonFile: {
    type: String,
  }

});

const JsonModel1 = mongoose.model('JsonModel1', mongooseSchema);
module.exports = JsonModel1;

