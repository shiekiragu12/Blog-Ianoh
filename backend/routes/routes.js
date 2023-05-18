const express = require('express');
const app = express()
const Blog = require('./../models/Blog')
const router = express.Router()
const {getBlogs,getBlogsId,addBlog,updateBlog,deleteBlog} = require('./../controllers/BlogController')
const {registerUser,loginUser,currentUser} = require('./../controllers/UserController')

// the routes
router.get('/', (req, res) => {
    res.send("welcome to the backend")
})

// user's route

// register the user
router.post('/register', registerUser)

// login the user
router.post('/login', loginUser)

// get the current user
router.get('/user', currentUser)

// blogs routes adding,getting,deleting and updating the data

// get the blogs all of them
router.get('/blog', getBlogs)

// get the blog based on the id of the blog
router.get('/blog/:id', getBlogsId)

//  add the blog
router.post('/blog', addBlog)

// update the blog based on the id of the blog
router.put('/blog/:id', updateBlog)

// delete the blog based on the id of the blog
router.delete('/blog/:id', deleteBlog)

module.exports = router