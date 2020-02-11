const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const dataSchema = mongoose.Schema({
    positionX: String,
    positionY: String,
    positionZ: String,
    alpha: String,
    beta: String,
    gamma: String,
    created_at: Date
});

module.exports = mongoose.model('Data', dataSchema);