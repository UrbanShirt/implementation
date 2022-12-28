const User = require('../models/user');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');


// GET '/getUserData'
const getUserData = (req, res) => {
    User.findOne({username: req.params.username}, async (err, data) => {
        if (err || !data) {
            return res.status(404).json({error: "Impossible to find User"});
        } else {
            return res.status(200).json(data);
        }
    })
};

// POST '/registerUser'
const registerUser = (req, res) => {
    var pswRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    User.findOne({ username: req.body.username }, (err, data) => {
        if (err) {
            return res.status(400).json({error: "Registration failed"});
        } else if (data) {
            return res.status(400).json({error: "User already exists"});
        } else if (!pswRegex.test(req.body.password)) {
            return res.status(400).json({error: "The password is not 8 characters long, containing a lowercase and an uppercase letter, a number and a special character"});
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
                    return res.status(400).json({error: "Registration failed"});
                }
                return res.status(200).json(data);
            })
        }
    })
};

// POST '/login'
const login = (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (!user || user.password != req.body.password) {
            return res.status(400).json({success: false, error: "Bad credentials"});
        }

        var payload = {username: user.username, email: user.email, address: user.address, time: Date()};
        var token = jwt.sign(payload, process.env.SUEG_SECRET);

        return res.status(200).json({success: true, message: 'Logged in successfully',
            token: token, username: user.username});
    })
};


module.exports = {
    getUserData,
    registerUser,
    login
};

