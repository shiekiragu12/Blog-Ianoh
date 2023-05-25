// imports from outside
const Image = require('./../models/Image')


// getting the image uploaded from ckeditor
const uploadImage = async (req, res) => {
  const file = req.file;
  // Save the image to the database
  const image = await Image.create({
    image: file,
    filename: file, 
    });
  res.status(200).json(image);
};


module.exports = {uploadImage}