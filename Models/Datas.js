const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const dataSchema = mongoose.Schema({
    x: String,
    y: String,
    z: String,
    positionX: String,
    positionY: String,
    positionZ: String,
    alpha: String,
    beta: String,
    gamma: String,
    created_at: Date
});

module.exports = mongoose.model('Data', dataSchema);