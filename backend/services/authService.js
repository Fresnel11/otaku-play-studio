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

// Get user by ID
const getUserById = async (userId) => {
    const user = await User.findById(userId).select('-password');

    if (!user) {
        throw new Error('User not found');
    }

    return {
        id: user._id,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar,
        bio: user.bio,
        level: user.level,
        xp: user.xp,
        createdAt: user.createdAt
    };
};

// Update user profile
const updateProfile = async (userId, updates) => {
    const allowedUpdates = ['username', 'bio', 'avatar'];
    const filteredUpdates = {};

    // Only allow specific fields to be updated
    Object.keys(updates).forEach(key => {
        if (allowedUpdates.includes(key)) {
            filteredUpdates[key] = updates[key];
        }
    });

    // Check if username is being changed and if it's already taken
    if (filteredUpdates.username) {
        const existingUser = await User.findOne({
            username: filteredUpdates.username,
            _id: { $ne: userId }
        });

        if (existingUser) {
            throw new Error('Username already taken');
        }
    }

    const user = await User.findByIdAndUpdate(
        userId,
        filteredUpdates,
        { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
        throw new Error('User not found');
    }

    return {
        id: user._id,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar,
        bio: user.bio,
        level: user.level,
        xp: user.xp,
        createdAt: user.createdAt
    };
};

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    updateProfile,
    generateToken
};
