const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    is_delete: {
        type: Boolean,
        default: false,
    }
})

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Users",userSchema);