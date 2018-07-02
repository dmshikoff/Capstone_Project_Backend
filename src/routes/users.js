const express = require('express')
const router = express.Router()
const controller = require('../controllers/users')



router.get('/:usersId/', controller.getOne)
router.post('/', controller.create)
router.delete('/:usersId', controller.remove)

module.exports = router