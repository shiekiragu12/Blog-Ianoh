// imports from outside
const Image = require('./../models/Image')


// getting the image uploaded from ckeditor
const uploadImage= async(req, res) => {
    const file = req.file;
    // Process the uploaded file, save it to the appropriate location
  
    // Save the image to the database
    const image = new Image({
      filename: file,
      path: file,
    });
    await image.save();
  
    // Example response with the uploaded image URL
    const imageUrl = `http://localhost:5000/uploads/${file}`;
    res.status(200).send({ imageUrl });
  };

//   export the logic
module.exports = {uploadImage}