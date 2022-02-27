const express = require('express')
const router = express.Router();
const baidangController = require('../controllers/BaidangController');

router.get('/:id', baidangController.show);
router.get('/', baidangController.index);

module.exports = router;