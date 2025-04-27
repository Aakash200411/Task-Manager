const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        console.log('Received registration request:', req.body);
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ 
                message: 'All fields are required',
                missing: {
                    name: !name,
                    email: !email,
                    password: !password
                }
            });
        }

        // Check if user already exists
        console.log('Checking for existing user...');
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        console.log('Creating new user...');
        const user = new User({ name, email, password });
        await user.save();
        console.log('User created successfully:', user);

        // Check if JWT_SECRET is set
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not set in environment variables');
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        console.log('Registration successful, sending response');
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        // Send detailed error information
        res.status(500).json({ 
            message: 'Error creating user', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        console.log('Received login request:', { email: req.body.email });
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required',
                missing: {
                    email: !email,
                    password: !password
                }
            });
        }

        // Find user by email
        console.log('Finding user by email...');
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        console.log('Checking password...');
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if JWT_SECRET is set
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not set in environment variables');
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        console.log('Login successful, sending response');
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Error logging in', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, password } = req.body;
        const updateFields = {};
        if (name) updateFields.name = name;
        if (email) updateFields.email = email;
        if (password) updateFields.password = password;
        const user = await User.findByIdAndUpdate(userId, updateFields, { new: true });
        res.json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});

module.exports = router; 