const mongoose = require('mongoose');

const ShirtSchema = new mongoose.Schema({
    name: {type: String, required: true},
    creationDate: {type: Date, required: true},
    image: {type: String, required: true},
    creator: {type: String, required: true},
    color: String,
    material: String
});

const Shirt = mongoose.model('Shirt', ShirtSchema);
module.exports = Shirt;
