var express = require('express');
var router = express.Router();
let CampaignController = require('../controllers/CampaignController')();


/* GET List of Campaigns */
router.get('/', CampaignController.findAll.bind(CampaignController));
router.get('/:_id', CampaignController.findById.bind(CampaignController));
router.patch('/:_id/activate', CampaignController.activate.bind(CampaignController));
router.patch('/:_id/deactivate', CampaignController.deactivate.bind(CampaignController));

module.exports = router;
