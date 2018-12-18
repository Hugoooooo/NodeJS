var fs = require('fs');
var _path = './db.json';

//顯示所有會員資料
exports.findall = function (callback) {
    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err)
            return callback(err);
        return callback(null, JSON.parse(data).students);
    })
}
//顯示會員資料by ID
exports.findByID = function (id, callback) {
    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;
        var student = students.find((i) => { return i.id == id });
        return callback(null, student);
    })
}
//新增會員資料
exports.save = function (student, callback) {
    fs.readFile(_path, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;

        student.id = students[students.length - 1].id + 1;
        students.push(student);
        var filedata = JSON.stringify({
            students: students
        })
        fs.writeFile(_path, filedata, (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        })


        // return callback(null,JSON.parse(data).student);
    })
}
//更新會員資料
exports.updateByID = function (student, callback) {
    fs.readFile(_path, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;
        student.id = parseInt(student.id);
        var upData = students.find((i) => { return i.id == student.id });
        console.log(upData);
        for (key in upData) {
            upData[key] = student[key]
        }

        var filedata = JSON.stringify({
            students: students
        })
        fs.writeFile(_path, filedata, (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        })


        // return callback(null,JSON.parse(data).student);
    })
}
//刪除會員資料
exports.deleteByID = function (id, callback) {
    fs.readFile(_path, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;

        var index = students.findIndex((i) => { return i.id == id });
        students.splice(index, 1);

        var filedata = JSON.stringify({
            students: students
        })
        fs.writeFile(_path, filedata, (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        })


        // return callback(null,JSON.parse(data).student);
    })
}
