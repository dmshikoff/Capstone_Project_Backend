const express = require('express');
const controller = require('../controllers/plans');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:planId', controller.getOne);
router.post('/', controller.create);
router.put('/:planId', controller.update);
router.delete('/:planId', controller.remove);

module.exports = router;