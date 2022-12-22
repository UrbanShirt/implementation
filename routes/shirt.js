const { Router } = require('express');
const express = require('express');

const router = express.Router();
const shirtController = require('../controllers/shirt');

router.get('/allShirts', shirtController.getAllShirt);
router.post('/newShirt', shirtController.newShirt);
router.get('/getShirt:name', shirtController.getShirt);
router.delete('/deleteShirt:name', shirtController.deleteShirt);

module.exports = router;
