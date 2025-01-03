const express = require('express');
const router = express.Router();
const SiteController = require('../controller/SiteController');

router.get('/sites', SiteController.getSites);
router.get('/site/:id', SiteController.getSiteById);
router.post('/sites', SiteController.postSite);
router.put('/sites/:id', SiteController.updateSite);
router.delete('/site/:id', SiteController.deleteSite);

module.exports = router;
