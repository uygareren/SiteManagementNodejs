const express = require('express');
const AdminController = require('../controller/AdminController');

const router = express.Router();

router.post('/assign-debt', AdminController.postAddDebt);
router.post('/add-apartment', AdminController.adminAssignFlatToUser);

module.exports = router;
