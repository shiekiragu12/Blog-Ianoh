const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:[false]
        },
        description:{
            type:String,
            require:[false]
        },
        tag:{
            type:String,
            require:[false]
        },
        category:{
            type:String,
            require:[false]
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