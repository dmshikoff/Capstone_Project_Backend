const express = require('express');
const router = express.Router();
const controller = require('../controllers/recipes');

router.get('users/:userId/', controller.getAll);
router.get('users/:userId/recipes/:recipeId', controller.getOne);
router.post('users/:userId/', controller.create);
router.put('users/:userId/recipes/:recipeId', controller.update);
router.delete('users/:userId/recipes/:recipeId', controller.remove);

module.exports = router;