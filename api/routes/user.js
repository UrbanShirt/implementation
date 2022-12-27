const { Router } = require('express');
const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

router.get('/getUserData/:username', userController.getUserData);

module.exports = router;
