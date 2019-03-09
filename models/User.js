var mongoose=require('mongoose');

var userSchema=require('../schema/users');

var category=require('../schema/category');

module.exports=mongoose.model('user',userSchema);

