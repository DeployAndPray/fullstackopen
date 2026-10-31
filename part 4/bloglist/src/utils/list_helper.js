const dummy = (blogs) => {
  return blogs ? 1 : 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => { return blog.likes + sum}, 0)
}



module.exports = {
  dummy,
  totalLikes
}