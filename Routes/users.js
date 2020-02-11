const express = require("express");
const router = express.Router();

const UserController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

// @route   POST /signup
// @desc    Create a user
// @access  Public
router.post("/signup", UserController.user_signup);

// @route   POST /login
// @desc    Login a user
// @access  Public
router.post("/login", UserController.user_login);

// @route   DELETE /:userId
// @desc    Delete a user
// @access  Private
router.delete("/:userId", UserController.user_delete);

module.exports = router;