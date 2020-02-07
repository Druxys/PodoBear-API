const Express = require('express');
const Mongoose = require('mongoose');

const app = Express();

// avoid CORS policy
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// connection to MongoDB
Mongoose
    .connect('dbURI', { useNewUrlParser: true })
    .then(() => console.log('Connexion à la base de données réussie !'))
    .catch(err => console.log(err));
