const express = require('express')
const router = express.Router()
const productTypeController = require('../Controller/ProductTypesController')

router.get('/', productTypeController.getAll)
router.get('/:id', productTypeController.getById)
router.post('/', productTypeController.create)
router.put('/:id', productTypeController.update)
router.delete('/:id', productTypeController.deleteOne)

module.exports = router
