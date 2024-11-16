const express = require('express');
const BlockController = require('../controller/BlockController');

const router = express.Router();

router.get('/blocks', BlockController.getBlocks);
router.get('/blocks/:id', BlockController.getBlockById);
router.get('/blocks/site/:siteId', BlockController.getBlocksBySiteId);
router.post('/blocks', BlockController.postBlock);
router.put('/blocks/:id', BlockController.updateBlock);
router.delete('/blocks/:id', BlockController.deleteBlock);

module.exports = router;