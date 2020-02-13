const express = require("express");
const router = express.Router();

const UserController = require('../Controllers/users');
const checkAuth = require('../Middleware/check-auth');
const authorize = require('../Middleware/role_authorization');
const role = require('../Middleware/roles');

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
router.delete("/:userId", checkAuth, authorize(role.admin), UserController.user_delete);

// @route   GET /
// @desc    Find all users
// @access  Private
router.get("/", UserController.get_all);

module.exports = router;