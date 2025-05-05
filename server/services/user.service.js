const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;


const registrationUser = async (name, email, password) => {
    if (!name || !email || !password) {
        throw new Error("Name, email, and password are required.");
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User with this email already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        return user;
    } catch (err) {
        console.error("Error registering user:", err.message);
        throw err;
    }
};

const loginUser = async (email, password) => {
    if (!email || !password) {
        throw new Error("Email and password are required.");
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password.");
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        };
    } catch (err) {
        console.error("Login error:", err.message);
        throw err;
    }
};

const allUsers = async (currentUserId) => {
    try {
      const users = await User.find({ _id: { $ne: currentUserId } });
      return users;
    } catch (err) {
      console.error("Error fetching users:", err.message);
      throw err;
    }
  }


module.exports = { registrationUser, loginUser, allUsers };
