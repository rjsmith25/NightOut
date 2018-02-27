const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: [true, 'Must provide a user id']
  },
  name: {
    type: String,
    required: [true, 'must provided a name of user']
 }
})

const barSchema = new mongoose.Schema({
  bar_id: {
    type: String,
    required: [true, 'Must have a bar id'],
    unique: true
  },
  attending: [userSchema]
})

const Bar = mongoose.model('bar', barSchema);

module.exports = Bar;
