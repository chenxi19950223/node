var express = require('express');

var reouter = express.Router();

var userData = require('../models/User');

var category = require('../models/category');

var article = require('../models/article');

var json = {};

reouter.use(function (req, res, next) {
    json = {
        code: 0,
        msg: 'success'
    };
    next()
});

reouter.use(function (req, res, next) {
    if (!req.usersInfo.isAdmin) {
        res.send('404!');
        res.end();
    }
    next()
});

//用户信息展示
reouter.get('/login', function (req, res) {
    // console.log(req.query.page);
    var page = Number(req.query.page) || 1;
    userData.count().then(function (count) {
        var limit = 4;
        var pages = Math.ceil(count / limit);
        var a = (page - 1) * limit
        userData.find().limit(limit).skip(a).then(function (data) {
            res.render('../tpl/admin/admin.ejs', {
                xc: data,
                limit: limit,
                count: count,
                pages: pages,
                page: page
            });
        })
    })
});

//分类管理
reouter.get('/category', function (req, res) {
    category.find().then(function (data) {
        res.render('../tpl/admin/category.ejs', {data: data})
    });
});

//新增分类
reouter.get('/form', function (req, res) {
    res.render('../tpl/admin/form.ejs')
});

reouter.post('/form', function (req, res, next) {
    // console.log(req.body.name);
    var name = req.body.name;
    category.findOne({
        name: name
    }).then(function (info) {
        if (info) {
            json.msg = '分类信息已经存在';
            json.code = 1;
            res.send(json);
            return
        }
        var categorys = new category({
            name: name
        });
        return categorys.save();
    }).then(function (cc) {
        json.msg = '分类信息添加成功！';
        res.send(json);
        res.end();
    });
});

//删除分类
reouter.get('/category/dl', function (req, res) {
    var id = req.query.id
    category.remove({_id: id}).then(function (info) {
        json.code = 0;
        json.msg = '删除成功';
        res.send(json);
        res.end();
    })

});

//修改分类；
reouter.get('/category/de', function (req, res) {
    console.log(req.query);
    var id = req.query.id,
        name = req.query.name;
    category.findOne({
        _id: {$ne: id},
        name: name
    }).then(function (info) {
        if (info) {
            json.msg = '已存在相同的分类名!';
            res.send(json);
            return;
        } else {
            return category.update({
                _id: id
            }, {
                name: name
            })
        }
    }).then(function (news) {
        json.msg = '修改成功!';
        res.send(json);
        res.end();
    })
});

//文章分类；
reouter.get('/article', function (req, res) {
    category.find().then(function (data) {
        article.find().then(function (info) {
            res.render('../tpl/admin/article.ejs', {name: info, data: data})
        })
    })

})
//新增文章
reouter.get('/article-add', function (req, res) {
    category.find().then(function (info) {
        res.render('../tpl/admin/article-add.ejs', {list: info})
    });

});

reouter.post('/article-add', function (req, res) {
    var title = req.body.title,
        tion = req.body.tion,
        con = req.body.con,
        op = req.body.op,
        names = req.body.names;
    new article({
        title: title,
        abstract: tion,
        content: con,
        class: op,
        names: names
    }).save().then(function (info) {
        res.end()
    })

});


//删除
reouter.get('/article-da', function (req, res) {
    var id = req.query.id;
    article.remove({_id: id}).then(function (info) {
        json.code = 3;
        res.send(json)
        res.end()
    })
});


//文章修改
reouter.post('/article/up', function (req, res) {
    var id = req.body.id;
    console.log(id);
    article.update({
        _id: id
    }, {
        class: req.body.opv,
        title: req.body.title,
        abstract: req.body.abstract,
        content: req.body.content,
        names: req.body.op,
        class: req.body.opv
    }).then(function (info) {
        console.log(info)

    })
});

//文章修改置顶
// reouter.post('/article/updow',function (req,res) {
//     var id = req.body.id;
//     var title=req.body.title;
//     var abstract=req.body.abstract;
//     var content=req.body.content;
//     var op=req.body.op;
//     var opv=req.body.opv;
//     var com=req.body.com;
//     console.log(id);
//     article.remove({_id: id}).then(function (info) {
//         new article({
//             title: title,
//             abstract: abstract,
//             content: content,
//             class: opv,
//             names: op,
//             comments:com
//         }).save().then(function (info) {
//             console.log(info);
//             res.end()
//         })
//     })
//
// });
module.exports = reouter;