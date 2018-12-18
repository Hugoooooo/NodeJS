var express = require('express');
var fs = require('fs');
var router = express.Router();
var data_student = require('./student');

router.get('/', (req, res) => {
    data_student.findall((err, data) => {
        if (err) {
            return res.statusCode(500).send('Server Error');
        }
        res.render('index.html', {
            fruits: ['香蕉', '蘋果', '柳丁'],
            students: data
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
    data_student.save(req.body, (err) => {
        if (err) {
            return res.statusCode(500).send('Server Error');
        }
        res.redirect('/');
    })
})

router.get('/students/edit', (req, res) => {
    data_student.findByID(req.query.id, (err, data) => {
        if (err) {
            return res.statusCode(500).send('Server Error');
        }
        res.render('edit.html', {
            student: data
        })
    })
})

router.post('/students/edit', (req, res) => {
    data_student.updateByID(req.body, (err, data) => {
        if (err) {
            return res.statusCode(500).send('Server Error');
        }
        res.redirect('/');
    })
})

router.get('/students/delete', (req, res) => {
    data_student.deleteByID(req.query.id, (err, data) => {
        if (err) {
            return res.statusCode(500).send('Server Error');
        }
        res.redirect('/');
    })
})
module.exports = router;

