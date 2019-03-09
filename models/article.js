var mongoose=require('mongoose');

var article=require('../schema/article');

module.exports=mongoose.model('article',article);

