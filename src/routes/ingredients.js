const express = require('express');
const controller = require('../controllers/ingredients');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:ingredientId', controller.getOne);
router.post('/', controller.create);
router.put('/:ingredientId', controller.update);
router.delete('/:ingredientId', controller.remove);

module.exports = router;