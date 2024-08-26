/* eslint-disable no-undef */
const express = require('express')
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())

const persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(req,res) =>{
    res.json(persons)
});

app.get('/info',(req,res)=>{
    const entryTime = new Date().toLocaleString();
    const entryNum = persons.length;

    res.send(`
        <p>Phonebook has info for ${entryNum} of people</p><br/>
        <p>${entryTime}</p>
        `)
})

app.get('/api/persons/:id',(req,res)=>{
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    res.json(person)
})

app.delete('/api/persons/:id',(req,res)=>{
    const id = req.params.id
    const persons = persons.filter(person => person.id !== id)
    res.status(204).end
})


app.post('/api/persons',(req,res)=>{
    const person = req.body

    if(!person.name || !person.number || person.name === newEntry.name){
        return res.status(400).json({
             error: 'name must be unique' 
        })
    }

    const newEntry = {
        name:person.name,
        number:person.number,
        id:Math.floor(Math.random()*10000)
    }

    const persons = persons.concat(newEntry)
    res.json(newEntry)

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})