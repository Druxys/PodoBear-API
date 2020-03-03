const express = require('express');
const router = express.Router();

const DatasController = require('../Controllers/Datas');
const checkAuth = require('../Middleware/check-auth');
const authorize = require('../Middleware/role_authorization');
const role = require('../Middleware/roles');


// @route   POST datas/add
// @desc    Creates a data
router.post('/add', DatasController.data_add);

// @route   GET datas/
// @desc    Find all datas
router.get('/', DatasController.data_get_all);

// @route   GET datas/getsome/:pseudo
// @desc    Find all datas by a pseudo
router.get('/getsome/:pseudo', DatasController.data_get_some);


// @route   GET datas/getone/:id
// @desc    recupère une data selon l'id
router.get('/getone/:id', DatasController.data_get_one);


// @route   PUT datas/update/:id
// @desc    modifie les champs d'une data selon son id
router.put('/update/:id', DatasController.data_put_one);


// @route   DELETE datas/delete/:id
// @desc    supprime une data selon son id
router.delete('/delete/:id', DatasController.data_delete_one);

// @route   GET datas/getgeodatas/:id_device
// @desc    récupère les données de géolocalisation selon un id de téléphone
router.get('/getgeodatas/:id_device', DatasController.get_geolocalisation_from_device);

module.exports = router;