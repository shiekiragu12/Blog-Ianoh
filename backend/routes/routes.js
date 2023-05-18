const express = require('express');
const app = express()
const Blog = require('./../models/Blog')
const router = express.Router()

// the routes
router.get('/', (req, res) => {
    res.send("welcome to the backend")
})

// user's route

// blogs routes adding,getting,deleting and updating the data

// get the blogs all of them
router.get('/blog', async (req, res) => {
    try {
        const blog = await Blog.find({})
        res.status(200).json(blog)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

// get the blog based on the id of the blog
router.get('/blog/:id', async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id)
        res.status(200).json(blog)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})


//  add the blog
router.post('/blog', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        res.status(200).json(blog)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

// update the blog based on the id of the blog
router.put('/blog/:id', async (req, res) => {
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
})

// delete the blog based on the id of the blog
router.delete('/blog/:id', async (req, res) => {
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
})

module.exports = router