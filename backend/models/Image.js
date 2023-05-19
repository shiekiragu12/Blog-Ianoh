const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema(
    {
        filename: String,
        path: String,
    }
);

const Image = mongoose.model('ImageCkeditor', imageSchema)

module.exports = Image