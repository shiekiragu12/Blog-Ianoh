const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Enter Blog Title"]
        },
        description:{
            type:String,
            require:[true,"Enter Blog Data"]
        },
        tag:{
            type:String,
            require:[true,"Select Blog Tag"]
        },
        category:{
            type:String,
            require:[true,"Select Blog Category"]
        },
        image:{
            type:String,
            require:[false]
        }
    },
    {
        timestamps:true
    }
)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog