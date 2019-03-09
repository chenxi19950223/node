var mongoose=require('mongoose');

var category=require('../schema/category');

module.exports=mongoose.model('category',category);

