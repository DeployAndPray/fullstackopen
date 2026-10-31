const _ = require('lodash')

const dummy = (blogs) => {
  return blogs ? 1 : 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => { return blog.likes + sum}, 0)
}

const favoriteBlog = (blogs) => {
  return _.maxBy(blogs, 'likes') ?? null
}

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, 'author')
  const authors = _.map(counts, (count, author) => ({ author, blogs: count }))
  return _.maxBy(authors, 'blogs') ?? null
}

const mostLikes = (blogs) => {
  const groups = _.groupBy(blogs, 'author')
  const authors = _.map(groups, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes')
  }))
  return _.maxBy(authors, 'likes') ?? null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}