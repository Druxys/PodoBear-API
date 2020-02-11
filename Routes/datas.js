const express = require('express');
const router = express.Router();

const Data = require('../Models/Datas');

// @route   GET datas/test
// @desc    Tests datas route
// @access  Public
router.get('/test', (req, res) => res.send({msg: 'La route datas fonctionne !'}));


// @route   POST datas/add
// @desc    Creates a data
// @access  Public
router.post('/add', (req, res) => {
    const DataToAdd = new Data({
        positionX: req.body.positionX,
        positionY: req.body.positionY,
        positionZ: req.body.positionZ,
        alpha: req.body.alpha,
        beta: req.body.beta,
        gamma: req.body.gamma,
        created_at: Date.now(),
    });

    DataToAdd.save().then(data => res.send(data));
});

// @route   GET datas/getall
// @desc    Find all datas
// @access  Public
router.get('/getall', (req, res) => {
    Data.find()
        .sort({date: -1})
        .then(datas => res.send(datas))
        .catch(err => res.status(404).send({nodatafound: "Aucune data trouvée"}));
});

// @route   GET datas/getone/:id
// @desc    recupère une data selon l'id
// @access  Public
router.get('/getone/:id', (req, res) => {
    Data.findById(req.params.id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({nodatafound: 'La data avec cet ID n\'existe pas'})
            }
        })
        .catch(err =>
            res.status(404).send({nodatafound: 'La data avec cet ID n\'existe pas'})
        );
});

// @route   PUT datas/update/:id
// @desc    modifie les champs d'une data selon son id
// @access  Public
router.put('/update/:id', (req, res) => {
    Data.findById(req.params.id).then(data => {
        if (!data)
            return new Error('Erreur ! La data que vous voulez modifier n\'existe pas.');
        else {
            data.positionX = req.body.positionX;
            data.positionY = req.body.positionY;
            data.positionZ = req.body.positionZ;
            data.alpha = req.body.alpha;
            data.beta = req.body.beta;
            data.gamma = req.body.gamma;

            data.save().then(data => {
                res.send('La data a bien été modifiée !');
            })
                .catch(err => {
                    res.status(400).send("Erreur ! Modification impossible.");
                });
        }
    }).catch(err =>
        res.status(404).send({nodatafound: 'Erreur ! La data que vous voulez modifier n\'existe pas.'})
    )
});

// @route   DELETE datas/delete/:id
// @desc    supprime une data selon son id
// @access  Public
router.delete('/delete/:id', (req, res) => {
    Data.findByIdAndRemove(req.params.id).then(note => {
        if(!note) {

        } else {
            res.send({message: 'La data a bien été supprimée !'})
        }
    }).catch(err =>
        res.status(404).send({nodatafound: 'Erreur ! La data que vous voulez supprimer n\'existe pas.'})
    )
});

module.exports = router;