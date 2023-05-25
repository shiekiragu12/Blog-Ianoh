const mongoose = require('mongoose')

const tagSchema = mongoose.Schema(
    {
        category:{
            type:String,
            required:[false]
        },
        name:{
            type:String,
            require:[true, "Give a name to the tag"],
            unique:[true, "Tag  with the same name already set"]

        }
    },
    {
        timestamps:true
    }
)

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag