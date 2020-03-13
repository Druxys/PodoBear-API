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
            x: req.body[i].data.x,
            y: req.body[i].data.y,
            z: req.body[i].data.z,
            positionX: req.body[i].data.positionX,
            positionY: req.body[i].data.positionY,
            positionZ: req.body[i].data.positionZ,
            accX: req.body[i].data.accX,
            accY: req.body[i].data.accY,
            accZ: req.body[i].data.accZ,
            steps: req.body[i].data.steps,
            accuracy: req.body[i].data.accuracy,
            long: req.body[i].data.long,
            lat: req.body[i].data.lat,
            speed: req.body[i].data.speed,
            timestamp: req.body[i].data.timestamp,
            id_device: req.body[i].data.id_device,
            created_at: Date.now()
        });
        i++;

        DataToAdd.save().then(data => res.send(data))
            .catch(err => {
                res.status(500).json({error: err});
            });
    }
};
exports.get_one_by_device = (req, res, next) => {
    Data.find({id_device: req.params.id_device})
        .sort({timestamp: 1})
        .then(data => {
            if (data.length >= 1) {
                let today = new Date(Date.now());
                let arrayDate = [];

                data.forEach(function (data) {
                    if (data.timestamp) {
                        if (today.getDate() === data.timestamp.getDate() && today.getMonth() === data.timestamp.getMonth()) {
                            arrayDate.push({
                                data
                            })
                        }
                    }
                });
                res.send(arrayDate);
            } else {
                res.status(404).send({nodatafound: 'La data avec cet id_device n\'existe pas'})
            }
        })
        .catch(err =>
            res.status(404).send({nodatafound: 'La data avec cet id_device n\'existe pas'})
        );
};
exports.get_geolocalisation_from_device = (req, res, next) => {
    Data.find({id_device: req.params.id_device})
        .sort({timestamp: 1})
        .then(datas => {
            if (datas.length >= 1) {
                const todaysDate = new Date(Date.now());
                let array_ = [];
                datas.forEach(function (data) {
                    if (data.timestamp) {
                        if (todaysDate.getDate() === data.timestamp.getDate() && todaysDate.getMonth() === data.timestamp.getMonth()) {
                            if (!data.lat || !data.long) {
                                data.lat = "error";
                                data.long = "error";
                            }
                            array_.push([
                                data.long, data.lat])
                        }
                    }
                });
                const geoDatasArray = [{
                    type: "FeatureCollection",
                    name: "Tracks",
                    features: [
                        {
                            type: "Feature",
                            properties: {
                                Name: "chemin",
                                Remarks: "Nfactory rouen",
                                Length: "54827.73937141163"
                            },
                            geometry: {
                                type: "LineString",
                                coordinates: array_
                            }
                        }
                    ]
                }];

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
    Data.find({id_device: req.params.id_device})
        .sort({timestamp: 1})
        .then(data => {
            if (data.length >= 1) {
                let today = new Date(Date.now());
                let hello = new Date(today.getFullYear, today.getDate, today.getMonth);
                let value = Number(0);
                let result = [];
                data.forEach(function (data) {
                    if (data.timestamp) {
                        if (today.getDate() === data.timestamp.getDate() && today.getMonth() === data.timestamp.getMonth()) {
                            result.push(Number(data.steps))

                        }
                    }
                });

                res.send(result);
            } else {
                res.status(404).send({nodatafound: 'La data avec cet id n\'existe pas'})
            }
        })
        .catch(err =>
            res.status(404).send({nodatafound: 'La data avec cet id n\'existe pas'})
        );
};

exports.get_weekly_steps = (req, res, next) => {

};

exports.get_monthly_steps = (req, res, next) => {

};
