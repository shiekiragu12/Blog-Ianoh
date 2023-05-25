// imports from outside
const Blog = require('./../models/Blog')


// getting the blogs
const getBlogs= async(req, res) => {
    try {
        const blog = await Blog.find({})
        res.status(200).json(blog)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

// get the blogs by Id
const getBlogsId = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id)
         // if the blog is not found then display a message
         if (!blog) {
            return res.status(404).json({ message: "The blog is not found" })
        }
        res.status(200).json(blog)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

// add blogs to database
const addBlog = async (req, res) => {
    try {
        const pdfFile = req.file;
        const blog = await Blog.create(req.body,{image:pdfFile} )
        res.status(200).json(blog)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

// update the blogs
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findByIdAndUpdate(id, req.body)
        // if the blog is not found then display a message
        if (!blog) {
            return res.status(404).json({ message: "The blog is not found" })
        }
        const updatedBlog = await Blog.findById(id)
        res.status(200).json(updatedBlog)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

// delete the blogs
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findByIdAndDelete(id)
        if (!blog) {
            return res.status(404).json({ message: "The blog is not found" })
        }
        res.status(200).json(blog)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

module.exports = {getBlogs, getBlogsId, addBlog, updateBlog , deleteBlog}