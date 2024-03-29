const CompanyShirt = require('../models/company-shirt');
const CommunityShirt = require('../models/community-shirt');


// GET '/getCompanyShirts'
const getCompanyShirts = (req, res) => {
    CompanyShirt.find({}, (err, data) => {
        if (err || !data || data.length == 0) {
            return res.status(404).json({error: "Impossible to find shirts"});
        }
        return res.status(200).json(data);
    })
};

// GET '/getFilteredCompanyShirts/:name'
const getFilteredCompanyShirts = (req, res) => {
    let filterName = req.params.filterName;

    CompanyShirt.find({name: {$regex: '.*'+filterName+'.*', $options: 'i'}}, (err, data) => {
        if (err || !data || data.length == 0) {
            return res.status(404).json({error: "Impossible to find shirts"});
        } else {
            return res.status(200).json(data);
        }
    })
};

// GET '/getCommunityShirts'
const getCommunityShirts = (req, res) => {
    CommunityShirt.find({isPublic: true}, (err, data) => {
        if (err || !data || data.length == 0) {
            return res.status(404).json({error: "Impossible to find shirts"});
        }
        return res.status(200).json(data);
    })
};

// GET '/getFilteredCommunityShirts/:name'
const getFilteredCommunityShirts = (req, res) => {
    let filterName = req.params.filterName;

    CommunityShirt.find({$or:[
        {name: {$regex: '.*'+filterName+'.*', $options: 'i'}},
        {creator: {$regex: '.*'+filterName+'.*', $options: 'i'}}
        ]}, (err, data) => {
            if (err || !data || data.length == 0) {
                return res.status(404).json({error: "Impossible to find shirts"});
            } else {
                return res.status(200).json(data);
            }
    })
};

// POST '/likeCommunityShirt'
const likeCommunityShirt = (req, res) => {
    var likedShirt = req.body.name;
    var user = req.body.username;

    CommunityShirt.findOne({name: likedShirt}, (err, data) => {
        if (err || !data || data.length == 0) {
            return res.status(404).json({error: "Impossible to find shirt to like"});
        } else if (data.voters.includes(user)) {
            return res.status(400).json({error: "You already liked this shirt"});
        } else {
            CommunityShirt.updateOne({name: likedShirt}, {$inc: {likes: 1}, $push: {voters: user}}, (err, data) => {
                if (err || !data) {
                    return res.status(400).json({error: "Impossible to like shirt: an error occurred"});
                } else {
                    return res.status(200).json({message: "Like added"});
                }
            });
        }
    });
};

// GET '/getWeeklyShirt'
const getWeeklyShirt = (req, res) => {
    CommunityShirt.findOne({isMostLiked: true}, (err, data) => {
        if (err || !data || data.length == 0) {
            return res.status(404).json({error: "Impossible to find Weekly Shirt"});
        } else {
            return res.status(200).json(data);
        }
    })
};

// GET '/getHomepageCompanyShirt'
const getHomepageCompanyShirt = (req, res) => {
    CompanyShirt.findOne({name: 'homepage-company-shirt'}, (err, data) => {
        if (err || !data || data.length == 0) {
            return res.status(404).json({error: "Impossible to find homepage company Shirt"});
        } else {
            return res.status(200).json(data.image);
        }
    })
};

// GET '/getHomepageCommunityShirt'
const getHomepageCommunityShirt = (req, res) => {
    CompanyShirt.findOne({name: 'homepage-community-shirt'}, (err, data) => {
        if (err || !data || data.length == 0) {
            return res.status(404).json({error: "Impossible to find homepage community Shirt"});
        } else {
            return res.status(200).json(data.image);
        }
    })
};



module.exports = {
    getCompanyShirts,
    getFilteredCompanyShirts,
    getCommunityShirts,
    getFilteredCommunityShirts,
    likeCommunityShirt,
    getWeeklyShirt,
    getHomepageCompanyShirt,
    getHomepageCommunityShirt
};

