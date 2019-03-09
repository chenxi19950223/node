var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var user=new Schema({
    username:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:false
    }
});

module.exports=user;