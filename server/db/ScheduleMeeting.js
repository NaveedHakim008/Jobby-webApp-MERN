const mongoose = require('mongoose')
const scheduleMeetingSchema = new mongoose.Schema({
    time: String,
    venue: String,
    link: String,
    date: String,
    jobid: String,
    merdianTime: String,
    applicantid: String,
    type: String
})
module.exports = mongoose.model("ScheduleMeeting", scheduleMeetingSchema)