const mongoose = require('mongoose')

const tagSchema = mongoose.Schema(
    {
        category:{
            type:String,
            required:[false]
        },
        name:{
            type:String,
            require:[true, "Give a name to the tag"]
        }
    },
    {
        timestamps:true
    }
)

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag