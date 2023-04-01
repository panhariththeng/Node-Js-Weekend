const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    required: true,
    // unique: true,s
  },
  product_type_id: {
    type: mongoose.Types.ObjectId,
    ref: 'ProductTypes',
  },
  is_delete: {
    type: Boolean,
    default: false,
  },
})

productSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Products', productSchema)
