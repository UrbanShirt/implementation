const { Router } = require('express');
const express = require('express');

const router = express.Router();
const shirtController = require('../controllers/shirt');
const tokenChecker = require('../tokenChecker.js');

router.get('/getCompanyShirts', shirtController.getCompanyShirts);
router.get('/getFilteredCompanyShirts/:filterName', shirtController.getFilteredCompanyShirts);

router.get('/getCommunityShirts', shirtController.getCommunityShirts);
router.get('/getFilteredCommunityShirts/:filterName', shirtController.getFilteredCommunityShirts);

router.get('/getWeeklyShirt', shirtController.getWeeklyShirt);

router.get('/getHomepageCompanyShirt', shirtController.getHomepageCompanyShirt);
router.get('/getHomepageCommunityShirt', shirtController.getHomepageCommunityShirt);

// only logged users can like a shirt
router.post('/likeCommunityShirt', tokenChecker);
router.post('/likeCommunityShirt', shirtController.likeCommunityShirt);

module.exports = router;
