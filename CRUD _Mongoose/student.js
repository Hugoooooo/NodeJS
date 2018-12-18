var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/itcast',{ useNewUrlParser: true });

var commentscehema = new Schema({
    name: {
        type: String,
        require: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    age: {
        type: Number
    },
    hobbies: {
        type: String
    }
});

module.exports = mongoose.model('Comment',commentscehema);



