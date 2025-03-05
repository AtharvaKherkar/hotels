const mongoose = require('mongoose')

//Define the MongoDB connection URL 
const mongoURL = 'mongodb://localhost:27017/hotels' 

//Set up MongoDB connection 
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true 
})
//Get the default connection 
//Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection

//Define event listener for database connection 
db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})
db.on('error',()=>{
    console.log('Connection Error');
})
db.on('disconnected',()=>{
    console.log('Disconnected to MongoDB server');
})

//Export the connetion 
module.exports = db