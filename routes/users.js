const Express = require('express');
const router = Express.Router();

const User = require('../Models/Users');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'La route users fonctionne !'}));


// @route   POST api/users/add
// @desc    Creates a user
// @access  Public
router.post('/add', (req, res) => {
    const UserToAdd = new User({
        username: req.body.username,
        password: req.body.password,
        token: 'token à definir à part du req',
        name: req.body.name,
        lastname: req.body.lastname,
    });

    UserToAdd.save().then(user => res.json(user));
});

// @route   GET api/users/getall
// @desc    Find all users
// @access  Public
router.get('/getall', (req, res) => {
    User.find()
        .sort({date: -1})
        .then(users => res.json(users))
        .catch(err => res.status(404).json({nouserfound: "Aucun utilisateur trouvé"}));
});

module.exports = router;