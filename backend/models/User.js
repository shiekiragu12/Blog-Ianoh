const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        full_name:{
            type:String,
            require:[true,"Kindly enter your full names"]
        },
        email:{
            type:String,
            require:[true, "Enter your email"]
        },
        phone:{
            type:Number,
            require:[false]
        },
        role:{
            type:String,
            require:[true, "Kindly Ensure you have selected the role"]
        }
    },
    {
        timestamps:true

    }
)

const User = mongoose.model('User', blogSchema)

module.exports = User