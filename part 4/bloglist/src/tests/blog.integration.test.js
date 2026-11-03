const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mockBlogs = require('./mocks/blogs.mock')
const Blog = require('../models/blog')
const mongoose = require('mongoose')

const mocks = mockBlogs.multiBlogs
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = mocks.map(
    (blog) => new Blog(blog)
  )
  const blogPromiseArray = blogObjects.map(b => b.save())
  await Promise.all(blogPromiseArray)
})

describe('Get All Blog Posts', () => {

  test(`${ mocks.length } blogs are returned`, async () => {
    const resp = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.equal(resp.body.length, mocks.length)
  })

  test('verify id attribute to be present', async () => {
    const resp = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.notEqual(resp.body[0].id, undefined)
  })
})


describe('Adding Blog posts', () => {

  test('verify the total when a new blog is posted', async () => {
    await api
      .post('/api/blogs')
      .send( {
        title: 'Dummy title',
        author: 'John Doe',
        url: 'http://www.dummy.com',
        likes: 10
      })
      .expect('Content-Type', /json/)
      .expect(201)

    const resp = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.equal(resp.body.length, mocks.length + 1 )
  })

  test('verify the likes attribute to be 0 when omitted', async () => {
    const resp = await api
      .post('/api/blogs')
      .send( {
        title: 'Dummy title',
        author: 'John Doe',
        url: 'http://www.dummy.com',
      })
      .expect('Content-Type', /json/)
      .expect(201)

    const likesDefault = 0
    assert.equal(resp.body.likes, likesDefault)
  })

  test('verify status 400 when title or url are omitted when posting', async () => {
    await api
      .post('/api/blogs')
      .send( {
        author: 'John Doe',
      })
      .expect(400)
  })
})

describe('Removing blog posts', () => {

  let idOfFirstBlog

  beforeEach(async () => {
    const all = await api
      .get('/api/blogs')
      .expect(200)
    idOfFirstBlog = all.body[0].id
  })

  test('blog post was removed by id', async () => {

    await api
      .delete(`/api/blogs/${idOfFirstBlog}`)
      .expect(204)

    const resp = await api
      .get('/api/blogs')
      .expect(200)

    const ids = resp.body.map(b => b.id)
    assert(!ids.includes(idOfFirstBlog))
    assert.strictEqual(resp.body.length, mocks.length - 1)
  })

  test('error when id is malformed', async () => {
    const malformedId = 'ae9c5e24d79880d9cc33a3'
    await api
      .delete(`/api/blogs/${malformedId}`)
      .expect(400)
      .expect({ error: 'malformed string' })
  })

  test('respond idempotent when blog is already deleted', async () => {
    const nonExistingId = '6ae9c5e24d79880d9cc33000'
    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .expect(204)
  })
})

describe('put blog posts', () => {
  let firstBlog

  beforeEach(async () => {
    const all = await api
      .get('/api/blogs')
      .expect(200)
    firstBlog = all.body[0]
  })

  test('validate the updated likes', async () => {
    const newAmountOfLikes = firstBlog.likes + 1
    const result = await api
      .put(`/api/blogs/${ firstBlog.id }`)
      .send({
        likes: newAmountOfLikes
      })
      .expect(200)

    assert.strictEqual(result.body.likes, newAmountOfLikes)

    const blogInDb = await Blog.findById(firstBlog.id)
    assert.strictEqual(blogInDb.likes, newAmountOfLikes)
  })

  test('likes can be set to 0', async () => {
    const result = await api
      .put(`/api/blogs/${ firstBlog.id }`)
      .send({ likes: 0 })
      .expect(200)

    assert.strictEqual(result.body.likes, 0)
  })

  test('when likes are omitted', async () => {
    await api
      .put(`/api/blogs/${ firstBlog.id }`)
      .send({})
      .expect(400)
      .expect({ error: 'likes are missing' })

    const blogInDb = await Blog.findById(firstBlog.id)
    assert.strictEqual(blogInDb.likes, firstBlog.likes)
  })

  test('404 when blog does not exist', async () => {
    const nonExistingId = '6ae9c5e24d79880d9cc33000'
    await api
      .put(`/api/blogs/${ nonExistingId }`)
      .send({ likes: 1 })
      .expect(404)
  })

  test('error when id is malformed', async () => {
    const malformedId = 'ae9c5e24d79880d9cc33a3'
    await api
      .put(`/api/blogs/${ malformedId }`)
      .send({ likes: 1 })
      .expect(400)
      .expect({ error: 'malformed string' })
  })
})


after(async () => {
  await mongoose.connection.close()
})