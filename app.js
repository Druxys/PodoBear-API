const Express = require('express');
const Mongoose = require('mongoose');
const Cors = require('cors');
const BodyParser = require('body-parser');


const app = Express();
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());


// connection to MongoDB
Mongoose
    .connect('mongodb+srv://' + process.env.MONGO_ATLAS_ID + ':' + process.env.MONGO_ATLAS_PW + '@cluster0-86rki.mongodb.net/podobear?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à la base de données réussie !'))
    .catch(err => console.log(err));

app.use(Cors());

// avoid CORS policy
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/datas', require('./Routes/datas.route'));
app.use('/users', require('./Routes/users.route'));

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
