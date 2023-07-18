const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mongooseSchema = new Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
  }

});

const AuthModel = mongoose.model('AuthModel', mongooseSchema);

module.exports = AuthModel;