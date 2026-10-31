const emptyBlogs = []

const multiBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'The foo bar baz',
    author: 'Jane Doe',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 6,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'once upon a baz',
    author: 'John doe',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 4,
    __v: 0,
  },
]

const singleBlog = [multiBlogs[0]]


module.exports = {
  multiBlogs,
  singleBlog,
  emptyBlogs,
}