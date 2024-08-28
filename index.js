/* eslint-disable no-undef */
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express();
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())
// app.use(requestLogger)
app.use(cors())
mongoose.set('strictQuery', false)

// const persons = [
//   {
//     "id": "1",
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": "2",
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//   },
//   {
//     "id": "3",
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": "4",
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   }
// ]


const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })

  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler);

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
});

app.get('/info', (req, res) => {
  const entryTime = new Date().toLocaleString();
  const entryNum = persons.length;

  res.send(`
        <p>Phonebook has info for ${entryNum} of people</p><br/>
        <p>${entryTime}</p>
        `)
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

app.put('api/persons/:id',(req,res,next)=>{
  const {name, number} = body.req


  Person.findByIdAndUpdate(req.params.id,{name,number},{new:true,runValidators:true, context:'query'})
  .then(updatePerson=>{
    res.json(updatePerson)
  })
  .catch(err=> next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end
    })
    .catch(err => next(err))
})


app.post('/api/persons', (req, res,next) => {
  const person = req.body

  const newEntry = new Person({
    name: person.name,
    number: person.number,
    id: Math.floor(Math.random() * 10000)
  }
  )
  newEntry.save().then(savedPerson => {
    res.json(savedPerson)
  })
  .catch(err => next(err))

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})