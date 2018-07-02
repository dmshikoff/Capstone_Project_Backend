const express = require('express');
const router = express.Router();
const controller = require('../controllers/ingredients');

router.get('users/:userId/', controller.getAll);
router.get('users/:userId/ingredients/:ingredientId', controller.getOne);
router.post('users/:userId/', controller.create);
router.put('users/:userId/ingredients/:ingredientId', controller.update);
router.delete('users/:userId/ingredients/:ingredientId', controller.remove);

module.exports = router;