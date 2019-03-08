var express = require('express');

var app = express();

var ejs = require('ejs');

var cookies = require('cookies');

var mongoose = require('mongoose');

var admin = require('./routes/admin');

var api = require('./routes/api');

var main = require('./routes/main');

var bodyParser = require('body-parser');

var userTable=require('./models/User');

app.set('html', 'view engine');

app.set('views', './tpl');

app.engine('html', ejs.renderFile);

app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    req.cookies = new cookies(req, res);

    req.usersInfo = {};

    if (req.cookies.get('cx')) {
        try {
            req.usersInfo = JSON.parse(req.cookies.get('cx'));

            userTable.findById(req.usersInfo._id).then(function (xc) {
                req.usersInfo.isAdmin=xc.isAdmin;
                next();
            })
        } catch (e) {
        }
    }else {
        next();
    }

});

app.use('/public', express.static(__dirname + '/public'));

app.use('/admin', admin);

app.use('/api', api);

app.use('/', main);

mongoose.connect('mongodb://localhost:27018/blog', {useNewUrlParser: true}, function (err) {
    if (err) {
    } else {
        app.listen(8087);
    }
});


