const { Router } = require('express');
const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');
const tokenChecker = require('../tokenChecker');

router.post('/registerUser', userController.registerUser);
router.post('/login', userController.login);

// can view user data only if the user is logged
router.get('/getUserData/:username', tokenChecker);
router.get('/getUserData/:username', userController.getUserData);

module.exports = router;
