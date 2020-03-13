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

router.get('/getall', DatasController.data_get_all);
/**
 * @route GET datas/getsome/:pseudo
 * @desc Find all datas from a pseudo
 * @access Private
 */
router.get('/getsome/:pseudo', DatasController.data_get_some);

/**
 * @route GET datas/getone/:id
 * @desc get one date from his id
 * @access Private
 */

router.get('/getone/:id', DatasController.data_get_one);

/**
 * @route DELETE datas/:id
 * @desc Remove datas route for Admins
 * @access Private
 */

router.delete('/delete/:id', DatasController.data_delete_one);

// @route   GET datas/getgeodatas/:id_device
// @desc    récupère les données de géolocalisation selon un id de téléphone
router.get('/getgeodatas/:id_device', DatasController.get_geolocalisation_from_device);

// @route   GET datas/getdailysteps/:id_device
// @desc    recupère l'évolution du nombre de pas d'un appareil sur une journée
router.get('/getdailysteps/:id_device', DatasController.get_daily_steps);

// @route   GET datas/getweeklysteps/:id_device
// @desc    recupère l'évolution du nombre de pas d'un appareil sur une semaine
router.get('/getweeklysteps/:id_device', DatasController.get_weekly_steps);

// @route   GET datas/getmonthlysteps/:id_device
// @desc    recupère l'évolution du nombre de pas d'un appareil sur un mois
router.get('/getmonthlysteps/:id_device', DatasController.get_monthly_steps);

router.get('/getbydevice/:id_device', DatasController.get_one_by_device);

router.get('/steps/:id_device', DatasController.get_daily_steps);
module.exports = router;
