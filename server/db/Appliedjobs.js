const mongoose = require('mongoose')

const appliedjobschema = new mongoose.Schema({
    jobid: String,
    CV: {
        type: String
    },
    company: String,
    applicantid: String,
    status: {
        type: String,
        default: "Pending"
    }
})
module.exports = mongoose.model("appliedjob", appliedjobschema)
