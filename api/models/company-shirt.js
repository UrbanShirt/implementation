const mongoose = require('mongoose');

const CompanyShirtSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    creationDate: {type: Date, required: true},
    image: {type: String, required: true},
    color: {type: String, required: true, default: 'white'},
    material: {type: String, required: true, default: 'polyester'}
});

const CompanyShirt = mongoose.model('CompanyShirt', CompanyShirtSchema);
module.exports = CompanyShirt;
