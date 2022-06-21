const mongoose = require('mongoose')


const companyschema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    password: String
})
module.exports = mongoose.model("company", companyschema)