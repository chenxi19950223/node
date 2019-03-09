var express = require('express');

var reouter = express.Router();

var cookies=require('cookies');

var userschma = require('../models/User');

var article=require('../models/article');

var json = {};

reouter.use(function (req, res, next) {
    json = {
        code: 0,
        msg: 'success'
    };
    next();
});
//注册
reouter.post('/user/register', function (req, res) {

    var username = req.body.username;
    var password = req.body.password;
    var cpassword = req.body.cpassword;

    if (username === '') {
        json.code = 1;
        json.msg = '用户名不能为空';
        res.send(json);
        return;
    }
    ;

    if (password === '') {
        json.code = 2;
        json.msg = '密码不能为空';
        res.send(json);
        return;
    }
    ;

    if (cpassword != password) {
        json.code = 3;
        json.msg = '两次输入的密码不匹配';
        res.send(json);
        return;
    }

    userschma.findOne({
        username: username
    }).then(function (info) {
        if (info) {
            json.code = 6;
            json.msg = '用户名已存在';
            res.send(json);
            return;
        }
        var user = new userschma({
            username: username,
            password: password
        });
        return user.save();
    }).then(function (newInfo) {
        json.code = 7;
        json.msg = '注册成功';
        res.send(json);
        res.end;
    });

});

//登录
reouter.post('/user/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (username === '') {
        json.code = 4;
        json.msg = '用户名不能为空';
        res.send(json);
        return;
    };

    if (password === '') {
        json.code = 5;
        json.msg = '密码不能为空';
        res.send(json);
        return;
    };

    userschma.findOne({
        username:username,
        password:password
    }).then(function (info) {
        if (!info){
            json.code=8;
            json.msg='用户名不存在,或密码错误，';
            res.send(json);
            return;
        }

        req.cookies.set('cx',JSON.stringify({
            _id:info._id,
            username:info.username
        }));

        res.send(json);
        res.end;
    });
});

//退出；
reouter.get('/user/logout',function (req,res) {
    req.cookies.set('cx',null);
    json.code=9;
    json.msg='退出成功';
    res.send(json);
    res.end;
});


//分类渲染
reouter.get('/article/ione',function (req,res) {
    var id=req.query.id
    article.find({class:id}).then(function (data) {
        res.send(data);
        res.end()
    })
})
module.exports = reouter;