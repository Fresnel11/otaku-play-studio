const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// Register new user
const registerUser = async (username, email, password, firstname, lastname) => {
    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
        if (userExists.email === email) {
            throw new Error('Email already in use');
        }
        if (userExists.username === username) {
            throw new Error('Username already taken');
        }
    }

    // Create new user
    const user = await User.create({
        username,
        email,
        password,
        firstname,
        lastname
    });

    // Generate token
    const token = generateToken(user._id);

    return {
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            level: user.level,
            xp: user.xp,
            createdAt: user.createdAt
        },
        token
    };
};

// Login user
const loginUser = async (email, password) => {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    // Generate token
    const token = generateToken(user._id);

    return {
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            level: user.level,
            xp: user.xp,
            createdAt: user.createdAt
        },
        token
    };
};

module.exports = {
    registerUser,
    loginUser,
    generateToken
};
