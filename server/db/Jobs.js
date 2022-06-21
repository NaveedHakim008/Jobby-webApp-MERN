const mongoose = require('mongoose')
const jobschema = new mongoose.Schema({
    title: String,
    description: String,
    scope: String,
    type: String,
    duedate: String,
    name: String
})
module.exports = mongoose.model("job", jobschema)