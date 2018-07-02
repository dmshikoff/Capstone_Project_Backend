const express = require('express');
const controller = require('../controllers/recipes');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:recipeId', controller.getOne);
router.post('/', controller.create);
router.put('/:recipeId', controller.update);
router.delete('/:recipeId', controller.remove);

module.exports = router;