// imports from outside
const Tag = require('./../models/Tags')


// getting the tag
const getTags= async(req, res) => {
    try {
        const tag = await Tag.find({})
        res.status(200).json(tag)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

// get the tags by Id
const getTagsId = async (req, res) => {
    try {
        const { id } = req.params
        const tag = await Tag.findById(id)
        if (!tag) {
            return res.status(404).json({ message: "The tag is not found" })
        }
        res.status(200).json(tag)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

// add tag to database
const addTag = async (req, res) => {
    try {
        const tag = await Tag.create(req.body)
        res.status(200).json(tag)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

// update the tag
const updateTag = async (req, res) => {
    try {
        const { id } = req.params
        const tag = await Tag.findByIdAndUpdate(id, req.body)
        // if the tag is not found then display a message
        if (!tag) {
            return res.status(404).json({ message: "The tag is not found" })
        }
        const updatedTag = await Tag.findById(id)
        res.status(200).json(updatedTag)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

// delete the tags
const deleteTag = async (req, res) => {
    try {
        const { id } = req.params
        const tag = await Tag.findByIdAndDelete(id)
        if (!tag) {
            return res.status(404).json({ message: "The tag is not found" })
        }
        res.status(200).json(tag)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

module.exports = {getTags, getTagsId, addTag, updateTag , deleteTag}