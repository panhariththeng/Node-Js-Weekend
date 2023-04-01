const ProductTypes = require('../Model/ProductTypes')

const getAll = async (req, res) => {
  try {
    const productTypes = await ProductTypes.find({ is_delete: false })

    res.status(200).json({ success: true, data: productTypes })
  } catch (error) {
    res.status(400).json({ success: false, message: error })
  }
}

const getById = async (req, res) => {
  const id = req.params.id
  try {
    const productTypes = await ProductTypes.findById(id)
    if (!productTypes || productTypes.is_delete) {
      throw 'Product Types Does Not Exist'
    }

    res.status(200).json({ success: true, data: productTypes })
  } catch (error) {
    res.status(400).json({ success: false, message: error })
  }
}

const deleteOne = async (req, res) => {
  const id = req.params.id
  try {
    const productTypes = await ProductTypes.findById(id)

    if (!productTypes || productTypes.is_delete) {
      throw 'Product Type Does Not Exist'
    }
    productTypes.is_delete = true

    await productTypes.save()
    res.status(200).json({ success: true, data: productTypes })
  } catch (error) {
    res.status(400).json({ success: false, message: error })
  }
}

const update = async (req, res) => {
  const id = req.body.id // specific in route :id
  const { name } = req.body
  try {
    const productTypes = await ProductTypes.findById(id)

    if (!productTypes || productTypes.is_delete) {
      throw 'Product Type Does Not Exist'
    }

    if (name) productTypes.name = name

    await productTypes.save()
    res.status(200).json({ success: true, data: productTypes })
  } catch (error) {
    res.status(400).json({ success: false, message: error })
  }
}

const create = async (req, res) => {
  try {
    await ProductTypes.create(req.body)
    res.status(200).json({ success: true, message: ' Created Succfull' })
  } catch (error) {
    res.status(400).json({ success: false, message: error })
  }
}

module.exports = { getAll, getById, update, deleteOne, create }
