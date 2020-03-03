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

// @route   DELETE delete/:userId
// @desc    Delete a user
// @access  Private

router.delete("/delete_user/:userId", UserController.user_delete);

router.delete("/delete_account/:userId", UserController.user_delete_self);
// @route   GET /
// @desc    Find all users
// @access  Private

router.get("/getall", UserController.get_all);

// @route   PUT /modify/:id
// @desc    Modify user infos
// @access Private
router.put("/modify/:id", UserController.user_modify_infos);


router.post("/add_admin", UserController.admin_add);

module.exports = router;
