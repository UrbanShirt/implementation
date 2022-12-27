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

// POST '/registerUser'
const registerUser = (req, res) => {
    var pswRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    User.findOne({ username: req.body.username }, (err, data) => {
        if (err) {
            return res.json(`Something went wrong, please try again. ${err}`);
        } else if (data) {
            return res.json({ message: "User already exists" });
        } else if (!pswRegex.test(req.body.password)) {
            return res.json({ message: "The password is not 8 characters long, containing a lowercase and an uppercase letter, a number and a special character" });
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                birthDate: req.body.birthDate,
                password: req.body.password,
            })

            newUser.save((err, data) => {
                if (err) {
                    return res.json({ Error: err });
                }
                return res.json(data);
            })
        }
    })
};


module.exports = {
    getUserData,
    registerUser
};

