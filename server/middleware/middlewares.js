const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        } else {
            try {
                const user = await User.findById(decodedToken.id);
                if (!user) {
                    return res.status(401).json({ message: 'User not found' });
                }
                req.user = user; // Attach user to the request object
                next();
            } catch (error) {
                return res.status(500).json({ message: 'Internal server error', error });
            }
        }
    });
};
const requireAdmin = async (req, res, next) => {
    try {
        // Get the user ID from the request object
        const userId = req.user._id;

        // Fetch the user from the database
        const user = await User.findById(userId);

        // Check if the user exists and is an admin
        if (!user || user.user_type !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Access denied' });
        }

        // If the user is an admin, proceed to the next middleware
        next();
    } catch (error) {
        console.error('Error in requireAdmin middleware:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = { requireAuth ,requireAdmin};
