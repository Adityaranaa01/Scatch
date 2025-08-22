const { default: mongoose } = require('mongoose')

const ownerSchema = mongoose.Schema({
    fullname: {
        typeof: String,
        minLength: 3,
        trim: true
    },
    email: String,
    password: String,
    products: {
        typeof: Array,
        default: []
    },
    picture: String,
    gstin: String
})

module.exports = mongoose.model("owner", ownerSchema)