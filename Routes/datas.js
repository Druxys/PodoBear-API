const express = require('express');
const router = express.Router();

const DatasController = require('../Controllers/Datas');
const checkAuth = require('../Middleware/check-auth');
const authorize = require('../Middleware/role_authorization');
const role = require('../Middleware/roles');


// @route   POST datas/add
// @desc    Creates a data
// @access  Public
router.post('/add', DatasController.data_add);

// @route   GET datas/
// @desc    Find all datas
// @access  Public
router.get('/', DatasController.data_get_all);

// @route   GET datas/getsome/:pseudo
// @desc    Find all datas by a pseudo
// @access  Public
router.get('/getsome/:pseudo', DatasController.data_get_some);


// @route   GET datas/getone/:id
// @desc    recupère une data selon l'id
// @access  Public
router.get('/getone/:id', DatasController.data_get_one);


// @route   PUT datas/update/:id
// @desc    modifie les champs d'une data selon son id
// @access  Public
router.put('/update/:id', DatasController.data_put_one);


// @route   DELETE datas/delete/:id
// @desc    supprime une data selon son id
// @access  Private
router.delete('/delete/:id', DatasController.data_delete_one);

module.exports = router;
