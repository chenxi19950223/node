var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var user=new Schema({
    //标题
    title:{
        type:String,
        default:''
    },
    //简介
    abstract:{
        type:String,
        default:''
    },
    //时间
    current:{
        type:Date,
        default:new Date()
    },
    //内容
    content:{
        type:String,
        default:''
    },
    //阅读数量
    reading:{
        type:Number,
        default:0
    },
    //分类
    class:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    //评论
    comments:{
        type:Array,
        default:[]
    },
    //
    names :{
        type:String,
        default:''
    }

});

module.exports=user;