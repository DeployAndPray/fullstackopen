const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (_, response, next) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  }).catch( e => next(e))
})

blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch( e => next(e))
})

module.exports = blogRouter