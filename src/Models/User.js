const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
    },
    profileImage: {
        type: String,
        default: '',
    },
    storageUsed: {
        type: Number,
        default: 0,
    },
    storageLimit: {
        type: Number,
        default: 15 * 1024 * 1024 * 1024, // 15GB in bytes
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
