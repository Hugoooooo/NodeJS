var express = require('express');
var fs = require('fs');
var router = express.Router();
var Comment = require('./student');

router.get('/', (req, res) => {
    Comment.find((err, ret) => {
        if (err) {
            return res.statusCode(500).send('Server Error');
        }
        res.render('index.html', {
            fruits: ['香蕉', '蘋果', '柳丁'],
            students: ret
        })
    })
})

router.get('/students', (req, res) => {
    res.redirect('/');
})

router.get('/students/new', (req, res) => {
    res.render('new.html');
})

router.post('/students', (req, res) => {
    new Comment(req.body).save((err,ret) => {
        if (err) {
            return res.statusCode(500).send('Server Error');
        }
        res.redirect('/');
    })
})

router.get('/students/edit', (req, res) => {
    Comment.findById({_id:req.query.id}, (err, ret) => {
        if (err) {
            return res.statusCode(500).send('Server Error');
        }
        res.render('edit.html', {
            student: ret
        })
    })
})

router.post('/students/edit', (req, res) => {
    Comment.findByIdAndUpdate(
        {_id:req.body.id}
        ,req.body
        , (err, data) => {
        if (err) {
            return res.statusCode(500).send('Server Error');
        }
        res.redirect('/');
    })
})

router.get('/students/delete', (req, res) => {
    Comment.findByIdAndDelete(
        {_id:req.query.id}
        , (err, data) => {
        if (err) {
            return res.statusCode(500).send('Server Error');
        }
        res.redirect('/');
    })
})

module.exports = router;

