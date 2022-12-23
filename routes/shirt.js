const { Router } = require('express');
const express = require('express');

const router = express.Router();
const shirtController = require('../controllers/shirt');

router.get('/companyShirts', shirtController.getCompanyShirts);
router.get('/getCompanyShirt/:name', shirtController.getCompanyShirt);

router.get('/communityShirts', shirtController.getCommunityShirts);
router.get('/getCommunityShirt/:name', shirtController.getCommunityShirt);
router.get('/getWeeklyShirt', shirtController.getWeeklyShirt);

module.exports = router;
