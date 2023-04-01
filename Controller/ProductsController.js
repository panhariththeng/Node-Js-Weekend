const Products = require('../Model/Products')

const getAll = async (req, res) => {
  try {
    const products = await Products.find({ is_delete: false }).populate([
      { path: 'product_type_id', select: { name: 1 } },
      //   populate: {path:"upload_id"}
    ])

    res.status(200).json({ success: true, data: products })
  } catch (error) {
    res.status(400).json({ success: false, message: error })
  }
}

const getById = async (req, res) => {
  //   const {id} = req.params; //alot of value
  const id = req.params.id //specific id
  try {
    const product = await product.findById(id)
    if (!product || product.is_delete) {
      throw 'Product Types Does Not Exist'
    }

    res.status(200).json({ success: true, data: product })
  } catch (error) {
    res.status(400).json({ success: false, message: error })
  }
}

const deleteOne = async (req, res) => {
  const id = req.params.id
  try {
    const product = await Products.findById(id)

    if (!product || product.is_delete) {
      throw 'Product Type Does Not Exist'
    }
    product.is_delete = true

    await product.save()
    res.status(200).json({ success: true, data: product })
  } catch (error) {
    res.status(400).json({ success: false, message: error })
  }
}

const update = async (req, res) => {
  const { name, price, desc, product_type_id } = req.body
  const id = req.params.id
  try {
    const product = await Products.findById(id)

    if (!product || product.is_delete) {
      throw 'Data Not Exist'
    }
    if (name) product.name = name
    if (price) product.price = price
    if (desc) product.desc = desc
    if (product_type_id) product_type_id.name = product_type_id

    await product.save()
    res.status(200).json({ success: true, data: product })
  } catch (error) {
    res.status(400).json({ success: false, message: error })
  }
}

const create = async (req, res) => {
  //   const { name, price, desc, product_type_id } = req.body

  try {
    await Products.create(req.body)
    res.status(200).json({ success: true, message: 'Created Successsfully' })
    // const product = new Products()
    // product.name = name + 'World' // easy to read when have big data base
    // product.price = price
    // product.save()
  } catch (error) {
    res.status(400).json({ success: false, message: error })
  }
}

module.exports = { getAll, getById, update, deleteOne, create }
