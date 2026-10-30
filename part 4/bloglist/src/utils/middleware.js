const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('\nTimestamp:', new Date().toISOString())
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body:\n\t', req.body)
  logger.info('---\n')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send( { error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  switch(error.name){
    case 'CastError': return res.status(400).send({ error: 'malformed string' })
    case 'ValidationError': return res.status(400).send({ error: error.message })
  }

  next(error)
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}