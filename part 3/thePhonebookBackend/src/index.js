require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const { errorHandler, unknownEndpoint } = require('./services/errorHandler')
const Contact = require('./models/contact')

const app = express()
const PORT = process.env.PORT || 3001

morgan.token('data', function (req) {
  return JSON.stringify(req.body)
})

app.use(express.static('dist'))
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data'),
)

app.get('/api/persons', (req, res, next) => {
  Contact.find({})
    .then((data) => res.json(data))
    .catch((e) => next(e))
})

app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) res.json(contact)
      else res.status(404).end()
    })
    .catch((e) => next(e))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).send()
    })
    .catch((e) => next(e))
})

app.post('/api/persons', (req, res, next) => {
  const data = req.body
  const { name, number } = data ?? {}

  if (!name || !number) {
    return res.status(400).json({ error: 'The name or number is missing' })
  }

  const newContact = new Contact({
    name,
    number,
  })

  newContact
    .save()
    .then((savedContact) => {
      res.status(201).json(savedContact)
    })
    .catch(next)
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Contact.findById(req.params.id)
    .then((contact) => {
      if (!contact) {
        return res.status(404).end()
      }

      contact.name = name
      contact.number = number

      return contact.save().then((updatedContact) => {
        res.json(updatedContact)
      })
    })
    .catch((e) => next(e))
})

app.get('/api/info', (req, res, next) => {
  Contact.countDocuments()
    .then((total) => {
      const template = `Phonebook has info for ${total} people.<br>${new Date()}`
      res.contentType('text/html')
      res.send(template)
    })
    .catch((e) => next(e))
})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})
