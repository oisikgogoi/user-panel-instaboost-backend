//---------------------------------- importing all the files  -----------------------------------------

const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const userRoutes = require('./Routes/userRoutes')
const appRoutes = require('./Routes/appRoutes')
const cors = require("cors")

const app = express(); 

require('dotenv').config()            

//---------------------------------- middlewares -----------------------------------------

app.use(compression({
  level:6
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//---------------------------------- connecting to mongodb  -----------------------------------------
try{
    mongoose.connect('mongodb+srv://instaBoost:instaboost@cluster0.hvn5j0a.mongodb.net/?retryWrites=true&w=majority')
    console.log("MONGO DB CONNECTED")
}catch(err){
    console.log(err)
}

//----------------------------------Routes-----------------------------------------------
//User Routes
app.use('/',userRoutes)

//App Routes
app.use('/',appRoutes)


//----------------------------------listenong to  app -----------------------------------------
app.listen(5000, () => {
  console.log('Server running on port 5000');
});

//----------------------------------handeling 404 error -----------------------------------------

app.use((req,res,next)=>{
  return res.status(404).send('404 , cant find the page u r looking for')
})

