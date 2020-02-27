const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const dataSchema = mongoose.Schema({
    x: String,
    y: String,
    z: String,
    positionX: String,
    positionY: String,
    positionZ: String,
    accX: String,
    accY: String,
    accZ: String,
    pseudo: String,
    timestamp: Date,
    created_at: Date
});

module.exports = mongoose.model('Data', dataSchema);