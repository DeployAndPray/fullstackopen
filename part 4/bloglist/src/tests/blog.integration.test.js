const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mockBlogs = require('./mocks/blogs.mock')
const Blog = require('../models/blog')
const mongoose = require('mongoose')

const mocks = mockBlogs.multiBlogs
const api = supertest(app)

describe('integration tests', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = mocks.map(
      (blog) => new Blog(blog)
    )
    const blogPromiseArray = blogObjects.map(b => b.save())
    await Promise.all(blogPromiseArray)
  })

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


  after(async () => {
    await mongoose.connection.close()
  })
})