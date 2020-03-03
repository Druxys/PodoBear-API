const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: {
        type: String,
        maxlength: [50, "L'email est trop long. 50 caractères max."],
        minlength: [1, "L'email est trop court. 1 caractère min."],
        required: [true, "Un email doit être renseigné."]
    },
    id_device: {
        type: String,
        required: true
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
        default: 'user'
    },
    height: {
        type: String,
        default: null
    },
    weight: {
        type: String,
        default: null
    },

    height: {
        type: String,
    },
    weight: {
        type: String
    },

    birthday: {
        type: Date
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
