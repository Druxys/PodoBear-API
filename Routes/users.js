const express = require("express");
const router = express.Router();

const UserController = require('../Controllers/Users');
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
router.delete("/delete_user/:userId", checkAuth, authorize(role.admin), UserController.user_delete);

router.delete("/delete_account/:userId", checkAuth, authorize(role.user), UserController.user_delete_self);
// @route   GET /
// @desc    Find all users
// @access  Private
router.get("/getall", checkAuth, UserController.get_all);

router.post("/add_admin", checkAuth, authorize(role.admin), UserController.admin_add);

module.exports = router;
