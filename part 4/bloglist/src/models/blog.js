const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (_, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)