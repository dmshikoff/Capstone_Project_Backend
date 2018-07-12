const express = require('express');
const controller = require('../controllers/ingredients');
const router = express.Router({ mergeParams: true });

router.get('/', controller.getAllByUser);
router.get('/onHand', controller.getAllOnHand);
router.get('/:ingredientId', controller.getOne);
router.post('/', controller.create);
router.put('/:ingredientId', controller.update);
router.delete('/:ingredientId', controller.remove);

module.exports = router;