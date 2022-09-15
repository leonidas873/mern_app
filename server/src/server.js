require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workauts');


// express app
const app = express();



// middleware
app.use(express.json())


app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next()
    console.log("hi")
})

// routes
app.use('/api/workouts',workoutRoutes)

// connect to db

mongoose.connect(process.env.MONGODB_PSW)
    .then(()=>{

        // listen for requiests
console.log("successfull")
app.listen(process.env.PORT,()=>{
    console.log('listening on port 8000')
})
    })
    .catch((error)=>{
        console.log(error)
    })


