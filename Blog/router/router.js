var express = require('express');
var md5 = require('blueimp-md5');
var moment = require('moment');
var User = require('../models/user');
var Topic = require('../models/topic');
var Comment = require('../models/comment');
var router = express.Router()

/* #region  首頁*/
router.get('/', (req, res, next) => {
    Topic.find((err, data) => {
        if (err) {
            return next(err);
        }
        // data.forEach((obj)=>{
        //     obj.created_time = obj.created_time.toString();
        // })
        res.render('index.html', {
            user: req.session.user,
            topics: data
        });
    })
})
/* #endregion */

/* #region 登出入 */
router.get('/login', (req, res, next) => {
    res.render('login.html');
})
router.post('/login', (req, res, next) => {
    var body = req.body;
    body.password = md5(body.password);
    User.findOne({
        email: body.email,
        password: body.password
    }, (err, data) => {
        if (err) {
            return next(err);
        }
        if (!data) {
            return res.status(200).json({
                err_code: 1,
                message: 'Fail!'
            })
        }
        req.session.user = data;
        res.status(200).json({
            err_code: 0,
            message: 'Success!'
        })
    });
})
router.get('/logout', (req, res, next) => {
    req.session.user = null;
    // delete req.session.user
    res.redirect('/login');
})
/* #endregion */

/* #region  註冊*/
router.get('/register', (req, res, next) => {
    res.render('register.html');
})
router.post('/register', (req, res, next) => {
    var body = req.body;
    body.password = md5(body.password);
    User.findOne(
        {
            $or: [
                { email: body.email },
                { nickname: body.nickname }
            ]
        },
        (err, data) => {
            if (err) {
                return next(err);
            }
            if (data) {
                res.status(200).json({
                    err_code: 1,
                    message: '會員資料已重複(Email or Name)'
                })
            } else {
                new User(body).save((err, data) => {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).json({
                        err_code: 0,
                        message: 'ok'
                    })
                })
            }
        })
})
/* #endregion */

router.get('/topic/new', (req, res, next) => {
    res.render('topic/new.html', {
        user: req.session.user
    });
})
router.post('/topic/new', (req, res, next) => {
    var body = req.body;
    new Topic(
        {
            userid: req.session.user._id,
            title: body.title,
            content: body.content
        }).save((err, data) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({
                err_code: 0,
                message: 'ok'
            })
        })
})

router.get('/topic/edit', (req, res, next) => {
    res.render('topic/edit.html');
})
router.get('/topic/show', (req, res, next) => {
    Topic.findById(req.query.id, (err, topicdata) => {
        if (err) {
            return next(err);
        }
        Comment.find({
            topicID: req.query.id
        }).populate('userID')
            .exec((err, commentdata) => {
                if (err) {
                    return next(err);
                }
                res.render('topic/show.html', {
                    topicID: req.query.id,
                    content: topicdata.content,
                    user: req.session.user,
                    comments: commentdata,

                });
            })
    })
})
router.post('/topic/show', (req, res, next) => {
    var body = req.body;
    new Comment({
        topicID: body.topicID,
        userID: req.session.user._id,
        content: body.content,
    }).save((err, data) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            err_code: 0,
            message: 'ok'
        })
    })
})
module.exports = router;