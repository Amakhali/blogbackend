const { default: mongoose } = require("mongoose")

const url = process.env.MONGODB_URI
    
console.log('connecting to',url)

mongoose.connect(url)
.then(result =>{
    console.log('connected to MongoDB')
})
.catch(err =>{
    console.log(err.message)
})

const personSchema = new mongoose.Schema({
    name: {
      type:String,
      required:true,
      minLength:5
    },
    number: {
      type:String,
      required:true,
      minLength:11
    },
  })
  
  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Person', personSchema)