const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

module.exports = generateToken;
