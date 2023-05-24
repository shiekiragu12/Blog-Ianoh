const User = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register the user
const registerUser = async (req, res) => {
  const { full_name, email, password, phone, role } = req.body;
  try {
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Generate a salt value
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      full_name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate the access token
    const accessToken = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "2d",
    });

    // Generate the refresh token (optional)
    const refreshToken = jwt.sign({ userId: user._id }, "refreshSecretKey", {
      expiresIn: "7d",
    });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// all the users in database
const allUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// get the current user
const getUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    // if the blog is not found then display a message
    if (!user) {
      return res.status(404).json({ message: "The User is not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, allUser, getUserId };
