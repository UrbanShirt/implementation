const mongoose = require('mongoose');

const CompanyShirtSchema = new mongoose.Schema({
    name: {type: String, required: true},
    creationDate: {type: Date, required: true},
    image: {type: String, required: true},
    color: {type: String, required: true, default: 'bianco'},
    material: {type: String, required: true, default: 'poliestere'}
});

const CompanyShirt = mongoose.model('CompanyShirt', CompanyShirtSchema);
module.exports = CompanyShirt;
