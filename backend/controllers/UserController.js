const User = require('./../models/User')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
// register the user
const registerUser = async (req, res) => {
    const { full_name, email, password, phone, role } = req.body
    try {

        const userAvailable = await User.findOne({ email })
        if (userAvailable) {
            return res.status(409).json({ error: 'Email already exists' });

        }
        // sending in the password as a hashed password 
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create(
            {
                full_name,
                email,
                password: hashedPassword,
                phone,
                role,
            }
        )
        res.status(200).json(user)
    }
    catch (error) {
        res.status(400).json("Fill in all the fields")
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

// user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate the access token
        const accessToken = jwt.sign({ userId: user._id }, 'secretKey', {
            expiresIn: '2d',
        });

        // Generate the refresh token (optional)
        const refreshToken = jwt.sign({ userId: user._id }, 'refreshSecretKey', {
            expiresIn: '7d',
        });

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// get the current user
// user login
const currentUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

module.exports = { registerUser, loginUser, currentUser }