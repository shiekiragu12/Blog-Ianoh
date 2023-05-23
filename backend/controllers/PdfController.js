// imports from outside
const Pdf = require('./../models/PdfUpload')


// getting the pdf uploaded f
const uploadPdf = async (req, res) => {

    // Get the uploaded PDF file
    try {
        const pdfFile = req.file;
        if (!pdfFile) {
            return res.status(400).json({ error: 'No PDF file provided' });
        }

        // Access the form data sent from the frontend
        const { title, category, tag } = req.body;
        
        const pdf = await Pdf.create({
            title,
            category,
            tag,
            pdf: pdfFile.originalname,
            path: pdfFile.path,
            // Store the location of the uploaded PDF file
        });
        res.status(200).json(pdf)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
};


//   export the logic
module.exports = { uploadPdf }