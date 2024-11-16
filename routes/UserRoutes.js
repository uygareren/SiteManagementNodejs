const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

router.get('/debts', UserController.getDebts);
router.post('/pay-debt', UserController.postPayDebt);
router.get('/paid-debts', UserController.getPaidDebts);
router.get('/users-by-filters', UserController.getUsersByFilters);

module.exports = router;
