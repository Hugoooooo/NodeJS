var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })

var Schema = mongoose.Schema

var commentSchema = new Schema({
  topicID: {
    type: String,
    required: true
  },
  userID: {
    type: String, ref: 'User'
  },
  content: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Comment', commentSchema)


