const mongoose = require('mongoose')


const jobsschema = new mongoose.Schema({
    fullname: String,
    username: String,
    email: String,
    qualification: String,
    password: String
})
module.exports = mongoose.model("Jobseekers", jobsschema)