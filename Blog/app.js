var express = require('express');
var path = require('path')
var mongoose = require('mongoose');
var session = require('express-session');
var router = require('./router/router')
var bodyparser = require('body-parser')

var app = new express();
app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));

app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(session({
    // 配置加密字串，在原有的字串上加上這個字串拼起來去加密
    // 目的是為了增加安全性，防止客戶端惡意使用
    secret: 'keyboard cat',
    rcesave: false,
    saveUninitialized: true //無論是否有使用，默認給予一把鑰匙
}))

//日期轉換
var template = require('art-template');
template.defaults.imports.dateFormat = function (date, format) {
    if (typeof date === "string") {
        var mts = date.match(/(\/Date\((\d+)\)\/)/);
        if (mts && mts.length >= 3) {
            date = parseInt(mts[2]);
        }
    }
    date = new Date(date);
    if (!date || date.toUTCString() == "Invalid Date") {
        return "";
    }
    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
        var v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        } else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
};


app.use(router);

//配置一個處理 404 的中間件
app.use((req, res) => {
    res.render('404.html');
})

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send(err.message);
})

app.listen('3000', () => {
    console.log('Server running!');
})





