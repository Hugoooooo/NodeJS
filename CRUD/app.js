var express = require('express')
var router = require('./router')
var bodyparser = require('body-parser')

var app = express();
app.use('/public/', express.static('./public/'));
app.use('/node_modules/', express.static('./node_modules'));
app.engine('html', require('express-art-template'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(router);

app.listen('3000', () => {
    console.log('Service runnging!....')
})

app.use((req,res)=>{
    res.send('404444444444444444444');
})