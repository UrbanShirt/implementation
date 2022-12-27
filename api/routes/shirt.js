const { Router } = require('express');
const express = require('express');

const router = express.Router();
const shirtController = require('../controllers/shirt');

router.get('/getCompanyShirts', shirtController.getCompanyShirts);
router.get('/getFilteredCompanyShirts/:filterName', shirtController.getFilteredCompanyShirts);

router.get('/getCommunityShirts', shirtController.getCommunityShirts);
router.get('/getFilteredCommunityShirts/:filterName', shirtController.getFilteredCommunityShirts);
router.post('/likeCommunityShirt', shirtController.likeCommunityShirt);

router.get('/getWeeklyShirt', shirtController.getWeeklyShirt);

router.get('/getHomepageCompanyShirt', shirtController.getHomepageCompanyShirt);
router.get('/getHomepageCommunityShirt', shirtController.getHomepageCommunityShirt);

module.exports = router;
