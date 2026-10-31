const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const mockBlogs = require('./mocks/blogs.mock')

test('dummy returns one', () => {
  const result = listHelper.dummy(mockBlogs.emptyBlogs)
  assert.strictEqual(result, 1)
})

describe('Total likes', () => {
  test('when a list has only one blog, equals the likes', () => {
    const singleBlog = mockBlogs.singleBlog
    const result = listHelper.totalLikes(singleBlog)
    assert.strictEqual(result, 7)
  })

  test('when a list has multiple blogs, aggregate the likes', () => {
    const result = listHelper.totalLikes(mockBlogs.multiBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('Favorite Blog', () => {

  test('return null when there are no blogs', () => {
    const result = listHelper.favoriteBlog(mockBlogs.emptyBlogs)
    assert.strictEqual(result, null)
  })
  test('retrieve the only blog with in the list', () => {
    const expected = mockBlogs.singleBlog[0]
    const result = listHelper.favoriteBlog(mockBlogs.singleBlog)
    assert.deepStrictEqual(result, expected)
  })

  test('retrieve the blog with max likes in the list', () => {
    const expected = mockBlogs.multiBlogs[2]
    const result = listHelper.favoriteBlog(mockBlogs.multiBlogs)
    assert.deepStrictEqual(result, expected)
  })
})

describe('Most Blogs', () => {
  test('count when there are no blogs', () => {
    const mostBlogs = listHelper.mostBlogs(mockBlogs.emptyBlogs)
    assert.strictEqual(mostBlogs, null)
  })
  test('count when there are multiple blogs', () => {
    const mostBlogs = listHelper.mostBlogs(mockBlogs.multiBlogs)
    const expected = { author: 'Robert C. Martin', blogs: 3 }
    assert.deepStrictEqual(mostBlogs, expected)
  })
})

describe('Most Likes', () => {
  test('Fetch the top contributor', () => {
    const topBlogger = listHelper.mostLikes(mockBlogs.multiBlogs)
    const expected = { author: 'Edsger W. Dijkstra', likes: 17 }
    assert.deepStrictEqual(topBlogger, expected)
  })

  test('Return null when there are no contributors', () => {
    const topBlogger = listHelper.mostLikes(mockBlogs.emptyBlogs)
    const expected = null
    assert.strictEqual(topBlogger, expected)
  })
})
