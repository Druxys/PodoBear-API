const Express = require('express');
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');

const port = 3000;

const app = Express();
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

// avoid CORS policy
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// connection to MongoDB
Mongoose
    .connect('mongodb+srv://Podobear:6Ab3TVcdCjKtEQT@cluster0-86rki.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à la base de données réussie !'))
    .catch(err => console.log(err));

app.use('/datas', require('./routes/datas'));

app.listen(port, () => console.log(`Server running on port ${port}`));