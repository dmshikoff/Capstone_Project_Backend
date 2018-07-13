const express = require('express');
const controller = require('../controllers/plans');
const router = express.Router({mergeParams:true});

router.get('/', controller.getAll);
router.get('/:planId', controller.getOne);
router.get('/:planId/groceryList', controller.groceryList)
router.get('/:planId/implement', controller.implementPlan)
router.post('/:planId/email', controller.email)
router.post('/', controller.create);
router.put('/:planId', controller.update);
router.delete('/:planId', controller.remove);

module.exports = router;