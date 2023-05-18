const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        full_name:{
            type:String,
            required:[true,"Kindly enter your full names"]
        },
        email:{
            type:String,
            required:[true, "Enter your email"],
            unique:[true, "User with same address already registered"]
        },
        phone:{
            type:Number,
            required:[false]
        },
        password:{
            type:String,
            required:[true, "Kindly enter password"]
        },
        role:{
            type:String,
            required:[true, "Kindly Ensure you have selected the role"]
        }
    },
    {
        timestamps:true

    }
)

const User = mongoose.model('User', userSchema)

module.exports = User