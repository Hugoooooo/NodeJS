var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//連接數據庫
mongoose.connect('mongodb://localhost/itcast', { useNewUrlParser: true });

//設計集合結構
var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
});

var User = mongoose.model('User', userSchema);

/* #region 新增 */

// mongoose.model 方法就是用來將一個架構發佈為 model
// 第一個參數: 傳入一個大寫的名稱字串用來表示數據庫名稱
//            mongoose 會自動將大寫名詞的字串生成 **小寫複數** 的集合名稱
//            例如: User -> users 的集合名稱
// 第二個參數: 架構 Sechemac

// var admin = new User({
//     username: 'Ben',
//     password: '123',
//     email: 'hugo@gmail.com'
// })

// admin.save((err, ret) => {
//     if (err) {
//         console.log('保存失敗')
//     } else {
//         console.log('保存成功')
//         console.log(ret);
//     }
// })

/* #endregion */

/* #region 查詢 */

// (find  陣列 | findOne 物件)
// 第一個參數
User.find(
    (err, ret) => {
        if (err) {
            console.log('查詢失敗')
        } else {
            console.log(ret)
            console.log('--------------------')
        }
    })
// Promise 用法
User.findOne({ username: "Howard" })
    .then((data) => {
        if (data) {
            console.log("已存在");
        }
        else {
            new User({
                username: 'Howard',
                password: '123',
                email: 'hugo@gmail.com'
            }).save()
                .then(() => {
                    User.find()
                        .then((data) => {
                            console.log(data)
                        })
                })
        }
    })
/* #endregion */

/* #region 刪除 */

// User.remove(
//     {username:'Hugo'}
//     ,(err,ret) =>{
//         if(err){
//             console.log('刪除失敗')
//         }else{
//             console.log('刪除成功')
//             console.log(ret)
//         }

//     }
// )

/* #endregion */



/* #region 更新數據 */

// User.findByIdAndUpdate(
//     '5c137fac9dcb744c1ccf134a'
//     ,{username:'Hugo'}
//     ,(err,ret) =>{
//         if(err){
//             console.log('更新失敗')
//         }else{
//             console.log('更新成功')
//             console.log(ret)
//         }

//     }
// )

/* #endregion */