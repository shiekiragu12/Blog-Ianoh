const express = require("express");
const app = express();
const router = express.Router();
const {
  getBlogs,
  getBlogsId,
  addBlog,
  updateBlog,
  deleteBlog,
} = require("./../controllers/BlogController");
const {
  registerUser,
  loginUser,
  allUser,
  getUserId,
} = require("./../controllers/UserController");
const {
  getTags,
  getTagsId,
  addTag,
  updateTag,
  deleteTag,
} = require("./../controllers/TagController");
const { uploadImage } = require("./../controllers/ImageController");
const { uploadPdf } = require("./../controllers/PdfController");

const { mpesaCallback, raiseStk } = require("../controllers/mpesaControllers");
const generateToken = require("../middlewares/accessTokemMpesaMiddleware");

// the routes
router.get("/", (req, res) => {
  res.send("welcome to the backend");
});

router.post("/mpesa-callback", mpesaCallback);
router.post("/raise-stk", generateToken, raiseStk);

// user's route

// register the user
router.post("/register", registerUser);

// login the user
router.post("/login", loginUser);

// get the all user
router.get("/user", allUser);

// get logged in user
router.get("/user/:id", getUserId);

// blogs routes adding,getting,deleting and updating the data

// get the blogs all of them
router.get("/blog", getBlogs);

// get the blog based on the id of the blog
router.get("/blog/:id", getBlogsId);

//  add the blog
router.post("/blog", addBlog);

// update the blog based on the id of the blog
router.put("/blog/:id", updateBlog);

// delete the blog based on the id of the blog
router.delete("/blog/:id", deleteBlog);

// tags routes adding,getting,deleting and updating the data

// get the tag all of them
router.get("/tag", getTags);

// get the tag based on the id of the blog
router.get("/tag/:id", getTagsId);

//  add the tag
router.post("/tag", addTag);

// update the tag based on the id of the blog
router.put("/tag/:id", updateTag);

// delete the tag based on the id of the blog
router.delete("/tag/:id", deleteTag);

// uploading images from the ckeditor
const multer = require("multer");
const upload = multer({ dest: "uploads/images" });
const uploadpdfs = multer({ dest: "uploads/pdf" });

router.post("/upload-image", upload.single("image"), uploadImage);

// uploading pdf
router.post("/upload-pdf", uploadpdfs.single("pdf"), uploadPdf);

module.exports = router;
