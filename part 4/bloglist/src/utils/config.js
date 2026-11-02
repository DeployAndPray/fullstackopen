require('dotenv').config()


const PORT = process.env.PORT || 3003
const MONGODB_URI = (process.env.NODE_ENV === 'test'
  ? process.env.MONGODB_TEST_URI
  : process.env.MONGODB_URI
)
module.exports = {
  PORT,
  MONGODB_URI
}