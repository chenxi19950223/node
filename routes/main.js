var express = require('express');

var reouter = express.Router();

var article = require('../models/article');

var category = require('../models/category');

//主页面渲染
reouter.get('/', function (req, res) {
    var id=req.query.js;
    var page = Number(req.query.page) || 1;
    if (id){
        article.count({class:id}).then(function (count) {
            if(count===0){count=1}
            var limit = 4;
            var pages = Math.ceil(count / limit);
            var a = (page - 1) * limit;
            category.find().then(function (data) {
                article.find({class:id}).limit(limit).skip(a).then(function (info) {
                    res.render('main/index.ejs', {
                        usersInfo: req.usersInfo,
                        data: data,
                        str: info,
                        limit: limit,
                        page: page,
                        pages: pages,
                        id:id
                    });
                })
            })
        });
    }else {
        article.count().then(function (count) {
            if(count===0){count=1}
            var limit = 4;
            var pages = Math.ceil(count / limit);
            var a = (page - 1) * limit;
            category.find().then(function (data) {
                var all = article.find();
                all.then(function(allData){
                    all.limit(limit).skip(a).then(function (info) {
                        res.render('main/index.ejs', {
                            usersInfo: req.usersInfo,
                            data: data,
                            str: info,
                            limit: limit,
                            page: page,
                            pages: pages,
                            id:''
                        });
                    });
                });

            });
        });
    }
});

//文章渲染
reouter.get('/inoe',function (req,res) {
    var id=req.query.id;
    category.find().then(function (data) {
        article.findOne({_id:id}).then(function (info) {
            info.reading++;
            info.save();
            res.render('main/niew.ejs',{info:info,data:data,usersInfo: req.usersInfo})
        })
    })

});

module.exports = reouter;