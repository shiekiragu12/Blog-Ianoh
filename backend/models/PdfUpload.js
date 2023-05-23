const mongoose = require('mongoose')

const pdfSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Enter the title of the Blog"]
        },
        category:{
            type:String,
            require:[true,"Enter the category of the Blog"]
        },
        tag:{
            type:String,
            require:[true,"Enter the tag of the Blog"]
        },
        pdf:{
            type:String,
            require:[false]
        },
        path:{
            type:String,
            require:[false]
        }
    },
    {
        timestamps:true
    }
   
);

const Pdf = mongoose.model('PdfUploads', pdfSchema)

module.exports = Pdf