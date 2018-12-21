var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true })

var Schema = mongoose.Schema

var topicSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  userid:{
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Topic', topicSchema)


