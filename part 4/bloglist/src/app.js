const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

logger.info('connecting to', config.MONGODB_URI.replace(/\/\/([^:]+):[^@]+@/, '//$1:********@'))

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => logger.info('connected to DB'))
  .catch((e) => logger.error('error connecting to db', e.message))


app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter )

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app