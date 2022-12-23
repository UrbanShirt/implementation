const mongoose = require('mongoose');

const CommunityShirtSchema = new mongoose.Schema({
    name: {type: String, required: true},
    creationDate: {type: Date, required: true},
    image: {type: String, required: true},
    creator: {type: String, required: true},
    color: {type: String, required: true, default: 'bianco'},
    material: {type: String, required: true, default: 'poliestere'},
    likes: {type: Number, required: true, default: 0},
    isPublic: {type: Boolean, required: true, default: 'false'}
});

const CommunityShirt = mongoose.model('CommunityShirt', CommunityShirtSchema);
module.exports = CommunityShirt;
