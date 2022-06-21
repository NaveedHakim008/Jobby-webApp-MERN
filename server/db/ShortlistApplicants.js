const mongoose = require('mongoose')


const shortlistapplicantschema = new mongoose.Schema({
    name: String,
    position: String,
    jobid: String,
    applicantid: String
})
module.exports = mongoose.model("ShortlistApplicant", shortlistapplicantschema)