const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mongooseSchema = new Schema({
  metaID:{
    type: Number
  },
  key: {
    type: String
  },
  balance: {
    type: Number
  },
  profit:{
    type: Number 
  }

});

const Profit = mongoose.model('ProfitTable', mongooseSchema);
module.exports = Profit;

