const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const mockBlogs = require('./mocks/blogs.mock')

test('dummy returns one', () => {
  const result = listHelper.dummy(mockBlogs.emptyBlogs)
  assert.strictEqual(result, 1)
})

describe('Total likes',() => {
  test('when a list has only one blog, equals the likes', () => {
    const singleBlog = mockBlogs.singleBlog
    const result = listHelper.totalLikes(singleBlog)
    assert.strictEqual(result, 5)
  })

  test('when a list has multiple blogs, aggregate the likes',() => {
    const result = listHelper.totalLikes(mockBlogs.multiBlogs)
    assert.strictEqual(result, 15)
  })
})