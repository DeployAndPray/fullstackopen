const mongoose = require('mongoose')

const DB_URI = process.env.MONGODB_URI

console.log('connecting...')

mongoose
  .connect(DB_URI, { family: 4 })
  .then(() => {
    console.log('connected to DB')
  })
  .catch((e) => {
    console.log('error connection DB', e.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    match: [/^\d{2,3}-\d+$/, '{VALUE} is not a valid phone number'],
  },
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Contact', contactSchema)
