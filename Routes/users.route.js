const express = require("express");
const router = express.Router();

const UserController = require('../Controllers/user.controller');
const checkAuth = require('../Middleware/check-auth');
const authorize = require('../Middleware/authorize');
const role = require('../Middleware/roles');
/**
 * @route POST users/signup
 * @desc Add a user
 * @access Public
 */

router.post("/signup", UserController.user_signup);
/**
 * @route POST users/login
 * @desc User and admin connection
 * @access Public
 */
router.post("/login", UserController.user_login);

/**
 * @route DELETE users/delete_user/:id
 * @desc Delete a user by authorized admin
 * @access Private
 */

router.delete("/delete_user/:userId", checkAuth, authorize(role.admin), UserController.user_delete);

/**
 * @route DELETE users/delete_account/:id
 * @desc Delete a user by himself
 * @access Private
 */

router.delete("/delete_account/:userId", UserController.user_delete_self);

/**
 * @route users/getall
 * @desc get all users
 * @access Private
 */
router.get("/getall", checkAuth, authorize(role.admin), UserController.get_all);

/**
 * @route users/modify/:id
 * @desc Update user's infos
 * @access Private
 */
router.put("/modify/:id", checkAuth, UserController.user_modify_infos);

/**
 * @route users/add_admin
 * @desc Add an admin
 * @access Private
 */
router.post("/add_admin", checkAuth, authorize(role.admin), UserController.admin_add);

module.exports = router;
