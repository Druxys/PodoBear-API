const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const http = require("http");
const randomString = require("randomstring");
const checkAuth = require('../Middleware/check-auth');

const User = require("../Models/Users");

exports.user_signup = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                var isUnique = false;
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const newUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            role: req.default,
                            id_device: req.body.id_device
                        });
                        newUser
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
};

exports.user_login = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Login failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Login failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Login successful",
                        jwtoken: token,
                        iduser: user[0]._id
                    });
                }
                res.status(401).json({
                    message: "Login failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.user_delete = (req, res, next) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


exports.user_delete_self = (req, res, next) => {
    if (checkAuth._id === req.params.userId) {
        User.remove({_id: req.params.userId})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "User deleted"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    } else {
        res.writeHead(301, {"Location": "http://localhost:5000/users/"})
    }
};

exports.get_all = (req, res, next) => {

    User.find()
        .sort({date: -1})
        .then(users => res.send(users))
        .catch(err => res.status(404).send({nouserfound: "Aucun user trouvé"}));
};

exports.admin_add = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail already exists."
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            role: 'admin',
                            password: hash,
                            createdAt: new Date(),
                            updatedAt: null
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "Admin created."
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
};


exports.user_modify_infos = (req, res, next) => {
    User.findById(req.params.id).then(user => {
        if(!user) {
            res.status(404).send("Le user à cet ID n'existe pas")
        } else {
            user.height = req.body.height;
            user.weight = req.body.weight;
            user.updated_at = Date.now();

            user.save().then(user => {
                res.send("Les informations de l'utilisateur ont bien été modifiées.")
            })
                .catch(err => {
                    res.status(400).send("Erreur ! La modification n'a pas été effectuée.")
                })
        }
    });
};

