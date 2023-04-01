const express = require('express')
const router = express.Router()
const productController = require('../Controller/ProductsController')

router.get('/', productController.getAll)
router.get('/:id', productController.getById)
router.post('/', productController.create)
router.put('/:id', productController.update)
router.delete('/:id', productController.deleteOne)

module.exports = router
