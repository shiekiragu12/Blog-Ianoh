const express = require('express');
const app = express()
const mongoose = require('mongoose')

// the routes
app.get('/', (req,res) => {
    res.send("welcome to the backend")
})

// connect to the database
mongoose.
connect('mongodb+srv://sheerohkiragu:Rs05qwcTsCdfU2LD@cluster0.werilwj.mongodb.net/BlogApi?retryWrites=true&w=majority')
.then(() =>{
    app.listen(5000, () =>{
        console.log('Server is running on port 5000')
    })
    console.log("connected to mongo db")
}).catch((error) =>{
    console.log(error)
})