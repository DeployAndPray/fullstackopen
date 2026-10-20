const express = require('express')
let phonebook = require("./data/phonebook").phonebook

const app = express()
const PORT = 3001

app.use(express.json())



app.get('/api/persons', (req, res)=>{
  res.json(phonebook)
})



app.listen(
  PORT, 
  ()=> console.log(`server running on ${PORT}`)
)