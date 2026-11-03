const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  if(likes === undefined) return response.status(400).send({ error: 'likes are missing' })

  const foundBlog = await Blog.findById(request.params.id)
  if(!foundBlog) return response.status(404).end()

  foundBlog.likes = likes

  const result = await foundBlog.save()
  response.json(result)
})

module.exports = blogRouter