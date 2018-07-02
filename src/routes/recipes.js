const express = require('express');
const router = express.Router();
const authController = require('../controllers/recipes');

router.get('/', controller.getAll);
router.get('/:recipeId/', controller.getOne);
router.post('/', controller.create);
router.put('/:recipeId/', controller.update);
router.delete('/:recipeId', controller.remove);

module.exports = router;