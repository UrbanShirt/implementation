const { Router } = require('express');
const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');
const tokenChecker = require('../tokenChecker');

// swager imports
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/getUserData/:username', userController.getUserData);
router.post('/registerUser', userController.registerUser);
router.post('/login', userController.login);


module.exports = router;
