const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per windowMs
    message: 'Too many login attempts, please try again later.',
});

exports.login = async (req, res) => {
    // Apply the rate limiter middleware to the login route
    loginLimiter(req, res, async () => {
        const { username, password } = req.body;

        // Check if the username and password are valid
        // Replace this with your actual authentication logic
        if (username !== 'zillion' || password !== 'zillion') {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        try {
            // Replace the hardcoded user ID with the actual user ID retrieved from your authentication logic
            const userId = 'zillion';

            // Generate a JWT token with the user ID and your secret key
            const token = jwt.sign({ userId }, '123ABCDZYx', { expiresIn: '1h' });

            // Return the token and a success message in the response
            res.status(200).json({ userId, token, message: 'Login successful.' });
        } catch (error) {
            console.error('Login Error:', error);

            // Check for specific error types and provide more informative error messages
            if (error.name === 'JsonWebTokenError') {
                res.status(500).json({ message: 'Invalid token. Authentication failed.' });
            } else if (error.name === 'TokenExpiredError') {
                res.status(401).json({ message: 'Token expired. Please log in again.' });
            } else {
                res.status(500).json({ message: 'Login Error' });
            }
        }
    });
};
