const express = require('express')
const router = express.Router()
const UsersController = require('../Controller/UsersController')

router.get('/', UsersController.getAll)
router.get('/:id', UsersController.getById)
router.post('/', UsersController.create)
router.put('/:id', UsersController.update)
router.post('/login', UsersController.login)
router.delete('/:id', UsersController.deleteOne)
router.put('/changePassword/:id', UsersController.changePassword)

module.exports = router
