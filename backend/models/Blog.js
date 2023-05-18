const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Kindly enter the Blog's title"]
        },
        description:{
            type:String,
            require:[true, "Explain more about the blog"]
        },
        tag:{
            type:Selection,
            options:['Option1','option2','Option3'],
            require:[true, "Kindly Select the tag of the blog if it's not there add one"]
        }
    }
)