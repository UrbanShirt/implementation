const User = require('../models/user');


// GET '/getUserData'
const getUserData = (req, res) => {
    User.findOne({username: req.params.username}, async (err, data) => {
        if (err || !data) {
            return res.status(404).json({error: "Impossible to find User"});
        } else {
            return res.json(data);
        }
    })
};



module.exports = {
    getUserData
};

