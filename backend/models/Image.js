const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema(
    {
        filename:{
            type:String,
            required:[false]
        },
           image:{
            type:String,
            required:[false]
        }
    },
     {
        timestamps:true
    }
);

const Image = mongoose.model('ImageCkeditor', imageSchema)

module.exports = Image