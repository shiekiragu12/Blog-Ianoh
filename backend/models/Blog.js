const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,'Enter Blog Title']
        },
        description:{
            type:String,
            require:[true,'Enter Description']
        },
        tag:{
            type:String,
            require:[true,'Enter the Tag']
        },
        category:{
            type:String,
            require:[true,'Enter Category']
        },
        imag:{
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