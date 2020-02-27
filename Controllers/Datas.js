const Data = require('../Models/Datas');


exports.data_get_all = (req, res, next) => {
    Data.find()
        .sort({date: -1})
        .then(datas => res.send(datas))
        .catch(err => res.status(404).send({nodatafound: "Aucune data trouvée"}));
};

exports.data_get_one = (req, res, next) => {
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
};

exports.data_put_one = (req, res, next) => {
    Data.findById(req.params.id).then(data => {
        if (!data)
            return new Error('Erreur ! La data que vous voulez modifier n\'existe pas.');
        else {
            data.x = req.body.x;
            data.y = req.body.y;
            data.z = req.body.z;
            data.pseudo = req.body.pseudo;
            data.positionX = req.body.positionX;
            data.positionY = req.body.positionY;
            data.positionZ = req.body.positionZ;
            data.accX = req.body.accX;
            data.accY = req.body.accY;
            data.accZ = req.body.accZ;
            data.timestamp = req.body.timestamp;

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
};

exports.data_delete_one = (req, res, next) => {
    Data.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({nodatafound: 'Erreur ! La data que vous voulez supprimer n\'existe pas.'})
        } else {
            res.send({message: 'La data a bien été supprimée !'})
        }
    }).catch(err =>
        res.status(404).send({nodatafound: 'Erreur ! La data que vous voulez supprimer n\'existe pas.'})
    )
};

exports.data_add = (req, res, next) => {
    const DataToAdd = new Data({
        x: req.body.x,
        y: req.body.y,
        z: req.body.z,
        positionX: req.body.positionX,
        positionY: req.body.positionY,
        positionZ: req.body.positionZ,
        accX: req.body.accX,
        accY: req.body.accY,
        accZ: req.body.accZ,
        timestamp: req.body.timestamp,
        pseudo: req.body.pseudo,
        created_at: Date.now(),
    });

    DataToAdd.save().then(data => res.send(data));
};