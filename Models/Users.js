const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: {
        type: String,
        maxlength: [50, "L'email est trop long. 50 caractères max."],
        minlength: [1, "L'email est trop court. 1 caractère min."],
        required: [true, "Un email doit être renseigné."]
    },
    pseudo: {
        type: String,
        maxlength: [50, "Le pseudo est trop long. 50 caractères max."],
        minlength: [1, "Le pseudo est trop court. 1 caractère min."],
        required: [true, "Un pseudo doit être renseigné."]
    },
    password: {
        type: String,
        maxlength: [255, "Le mot de passe est trop long. 255 caractères max."],
        minlength: [5, "Le mot de passe est trop court. 5 caractères min."],
        required: [true, "Un mot de passe doit être renseigné."]
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user']
    },
    name: {
        type: String,
        maxlength: [50, "Le prénom est trop long. 50 caractères max."],
        minlength: [2, "Le prénom est trop court. 2 caractères min."]
    },
    lastname: {
        type: String,
        maxlength: [50, "Le nom est trop long. 50 caractères max."],
        minlength: [2, "Le nom est trop court. 2 caractères min."]
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('User', usersSchema);
