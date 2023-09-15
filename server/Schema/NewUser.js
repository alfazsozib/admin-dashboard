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
  },
  metaID:{
    type: Number,
  },
  affiliateName: {
    type: String,
  },

  affiliatePercentage: {
    type: Number,
  },
  ourFee: {
    type: Number
  }


});

const NewUser = mongoose.model('NewUser', mongooseSchema);

module.exports = NewUser;