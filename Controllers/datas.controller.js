const Data = require('../Models/datas.model');


exports.data_get_all = (req, res, next) => {
    Data.find()
        .sort({timestamp: -1})
        .then(datas => res.send(datas))
        .catch(err => res.status(404).send({nodatafound: "Aucune data trouvée"}));
};

exports.data_get_some = (req, res, next) => {
    Data.find({id_device: req.params.id_device})
        .sort({timestamp: -1})
        .then(data => {
            if (data.length >= 1) {
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
            data.positionX = req.body.positionX;
            data.positionY = req.body.positionY;
            data.positionZ = req.body.positionZ;
            data.accX = req.body.accX;
            data.accY = req.body.accY;
            data.accZ = req.body.accZ;
            data.steps = req.body.steps;
            data.accuracy = req.body.accuracy;
            data.long = req.body.long;
            data.lat = req.body.lat;
            data.speed = req.body.speed;

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
            timestamp_day: new Date(Date.now()).getDay(),
            // timestamp_month: Date.getMonth(),
            id_device: req.body[i].id_device,
            created_at: Date.now(),
        });
        i++;

        DataToAdd.save().then(data => res.send(data))
            .catch(err => {
                res.status(500).json({error: err});
            });
    }
};

exports.get_geolocalisation_from_device = (req, res, next) => {
    Data.find({id_device: req.params.id_device})
        .sort({timestamp: 1})
        .then(datas => {
            if (datas.length >= 1) {
                var todaysDate = new Date(Date.now());
                var geoDatasArray = [];
                var i = 0;
                datas.forEach(function (data) {
                    if (data.timestamp) {
                        if (todaysDate.getDate() === data.timestamp.getDate() && todaysDate.getMonth() === data.timestamp.getMonth()) {
                            if (!data.lat || !data.long) {
                                data.lat = "error";
                                data.long = "error";
                            }
                            geoDatasArray.push({
                                coordinates: '[' + data.lat + ', ' + data.long + ']',
                                timestamp: data.timestamp
                            });
                        }
                    }
                });
                res.send(geoDatasArray);
            } else {
                res.status(404).send("Aucune donnée trouvée pour cet appareil");
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

exports.get_daily_steps = (req, res, next) => {

};

exports.get_weekly_steps = (req, res, next) => {

};

exports.get_monthly_steps = (req, res, next) => {

};