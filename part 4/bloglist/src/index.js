require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./logger')

const app = express()
const PORT = process.env.PORT || 3003.

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

const Blog = mongoose.model('Blog', blogSchema)

mongoose
  .connect(process.env.MONGODB_URI, { family: 4 })
  .then(() => logger.info('connected to DB'))
  .catch((e) => logger.error('error while connecting to db', e))
app.use(express.json())

app.get('/api/blogs', (_, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  }).catch( e => logger.error(e))
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch( e => logger.error(e))
})

app.listen(PORT, () => {
  logger.info(`server running on port ${PORT}`)
})
