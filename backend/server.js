const express = require('express');
const app = express()
const mongoose = require('mongoose')
const route = require('./routes/routes')
const cors = require('cors');

// using express middleware for the purpose of sending my data
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', route)
// connect to the database
mongoose.
    connect('mongodb+srv://sheerohkiragu:Rs05qwcTsCdfU2LD@cluster0.werilwj.mongodb.net/BlogApi?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(5000, () => {
            console.log('Server is running on port 5000')
        })

        console.log("connected to mongo db")
    }).catch((error) => {
        console.log(error)
    })

