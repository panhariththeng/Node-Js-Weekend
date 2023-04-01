const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productTypesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  is_delete: {
    type: Boolean,
    default: false,
  },
})

productTypesSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('ProductTypes', productTypesSchema)
