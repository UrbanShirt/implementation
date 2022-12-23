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

//GET '/getCompanyShirt/:name'
const getCompanyShirt = (req, res) => {
    let name = req.params.name;

    CompanyShirt.findOne({name: name}, (err, data) => {
        if (err || !data) {
            return res.json({message: "Impossible to find shirt"});
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

//GET '/getCommunityShirt/:name'
const getCommunityShirt = (req, res) => {
    let name = req.params.name;

    CommunityShirt.findOne({name: name}, (err, data) => {
        if (err || !data) {
            return res.json({message: "Impossible to find shirt"});
        } else {
            return res.json(data);
        }
    })
};

//GET '/getWeeklyShirt'
const getWeeklyShirt = (req, res) => {
    res.json({message: "GET weekly shirt"});
};


//export controller functions
module.exports = {
    getCompanyShirts,
    getCompanyShirt,
    getCommunityShirts,
    getCommunityShirt,
    getWeeklyShirt
};

