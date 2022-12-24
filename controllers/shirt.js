const CompanyShirt = require('../models/company-shirt');
const CommunityShirt = require('../models/community-shirt');

// GET '/getCompanyShirts'
const getCompanyShirts = (req, res) => {
    CompanyShirt.find({}, (err, data) => {
        if (err) {
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

// GET '/getCompanyShirt/:name'
const getCompanyShirt = (req, res) => {
    let filterName = req.params.filterName;

    console.log(filterName);

    CompanyShirt.find({name: {$regex: '.*'+filterName+'.*', $options: 'i'}}, (err, data) => {
        if (err || !data) {
            return res.json({message: "Impossible to find shirts"});
        } else {
            return res.json(data);
        }
    })
};

// GET '/getCommunityShirts'
const getCommunityShirts = (req, res) => {
    CommunityShirt.find({}, (err, data) => {
        if (err) {
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

// GET '/getCommunityShirt/:name'
const getCommunityShirt = (req, res) => {
    let filterName = req.params.filterName;

    CommunityShirt.find({$or:[
        {name: {$regex: '.*'+filterName+'.*', $options: 'i'}},
        {creator: {$regex: '.*'+filterName+'.*', $options: 'i'}}
        ]}, (err, data) => {
            if (err || !data) {
                return res.json({message: "Impossible to find shirts"});
            } else {
                return res.json(data);
            }
    })
};

// POST '/likeCommunityShirt'
const likeCommunityShirt = (req, res) => {
    let likedShirt = req.params.filterName;

    CommunityShirt.updateOne({name: likedShirt}, {$inc: {likes: 1}}, (err, data) => {
        if (err || !data) {
            return res.json({message: "Impossible to find Like Shirt"});
        } else {
            console.log(data);
        }
    })
};

// GET '/getWeeklyShirt'
const getWeeklyShirt = (req, res) => {
    CommunityShirt.findOne({isMostlyLiked: true}, (err, data) => {
        if (err || !data) {
            return res.json({message: "Impossible to find Weekly Shirt"});
        } else {
            return res.json(data);
        }
    })
};

// GET '/getHomepageCompanyShirt'
const getHomepageCompanyShirt = (req, res) => {
    CommunityShirt.findOne({name: 'homepage-company-shirt'}, (err, data) => {
        if (err || !data) {
            return res.json({message: "Impossible to find homepage company Shirt"});
        } else {
            return res.json(data.image);
        }
    })
};

// GET '/getHomepageCommunityShirt'
const getHomepageCommunityShirt = (req, res) => {
    CommunityShirt.findOne({name: 'homepage-community-shirt'}, (err, data) => {
        if (err || !data) {
            return res.json({message: "Impossible to find homepage community Shirt"});
        } else {
            return res.json(data.image);
        }
    })
};


module.exports = {
    getCompanyShirts,
    getCompanyShirt,
    getCommunityShirts,
    getCommunityShirt,
    getWeeklyShirt,
    getHomepageCompanyShirt,
    getHomepageCommunityShirt,
    likeCommunityShirt // non testata + aggiungere le due magliette per la homepage
};

