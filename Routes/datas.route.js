const express = require('express');
const router = express.Router();

const DatasController = require('../Controllers/datas.controller');
const checkAuth = require('../Middleware/check-auth');
const authorize = require('../Middleware/authorize');
const role = require('../Middleware/roles');

/**
 * @route POST datas/add
 * @desc Create a data
 * @access Public
 */

router.post('/add', DatasController.data_add);
/**
 * @route GET datas/getall
 * @des Fin all datas
 * @access Private
 */

router.get('/getall', checkAuth, authorize(role.admin), DatasController.data_get_all);
/**
 * @route GET datas/getsome/:pseudo
 * @desc Find all datas from a pseudo
 * @access Private
 */
router.get('/getsome/:pseudo', checkAuth, DatasController.data_get_some);

/**
 * @route GET datas/getone/:id
 * @desc get one date from his id
 * @access Private
 */

router.get('/getone/:id', checkAuth, DatasController.data_get_one);

/**
 * @route DELETE datas/:id
 * @desc Remove datas route for Admins
 * @access Private
 */

router.delete('/delete/:id', checkAuth, authorize(role.admin), DatasController.data_delete_one);

module.exports = router;
