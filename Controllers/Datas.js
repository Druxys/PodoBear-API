const Data = require('../Models/Datas');


exports.data_get_all = (req, res, next) => {
    Data.find()
        .sort({timestamp: -1})
        .then(datas => res.send(datas))
        .catch(err => res.status(404).send({nodatafound: "Aucune data trouvée"}));
};

exports.data_get_some = (req, res, next) => {
    Data.find({pseudo: req.params.pseudo})
        .sort({timestamp: -1})
        .then(data => {
            if(data.length >= 1) {
                res.send(data);
            } else {
                res.status(404).send({nodatafound: "Aucune data trouvée"})
            }
        })
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
    let result = [];
    let i = 0;
    console.log(req.body);

    while (i < req.body.length) {
        const DataToAdd = new Data({
            x: req.body[i].x,
            y: req.body[i].y,
            z: req.body[i].z,
            positionX: req.body[i].positionX,
            positionY: req.body[i].positionY,
            positionZ: req.body[i].positionZ,
            accX: req.body[i].accX,
            accY: req.body[i].accY,
            accZ: req.body[i].accZ,
            steps: req.body[i].steps,
            accuracy: req.body[i].accuracy,
            long: req.body[i].long,
            lat: req.body[i].lat,
            speed: req.body[i].speed,
            timestamp: req.body[i].timestamp,
            pseudo: req.body[i].pseudo,
            created_at: Date.now(),
        });
        i++;

        DataToAdd.save().then(data => res.send(data))
            .catch(err => {
                res.status(500).send({error: next(err)});
            });
    }
};