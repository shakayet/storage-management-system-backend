const express = require('express');
const router = express.Router();
const {
  register,
  login,
  googleLogin,
  forgotPassword,
  resetPassword
} = require('../Controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
