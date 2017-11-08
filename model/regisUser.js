var mongoose = require('mongoose');

var registration = mongoose.Schema({
  _id:{type:Number},
   name:String,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  mobile:{type: Number},
   email:String,
   password: String,
});

module.exports = mongoose.model('user_master',registration);
