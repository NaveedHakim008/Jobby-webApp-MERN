
require('./db/Appliedjobs')
require('./db/Company')
require('./db/Jobs')
require('./db/Jobseeker')
require('./ShortlistApplicant')
require('dotenv').config();


const cors = require('cors')
const appliedjobs = require('./applyjobs')
const company = require('./company')
const jobs = require('./job')
const jobSeeker = require('./jobSeeker')
const shortlistApplicant = require('./shortlistapplicant')
const scheduleMeeting = require('./scheduleMeeting')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection;

if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    app.use(express.static(path.join('client/build')))
    app.get("*", (req, resp) => {
        resp.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}
connection.once('open', () => {

    console.log('Connected Database Successfully');

});
const bodyParser = require('body-parser')
app.use(express.json())
app.use(cors())
app.use(appliedjobs)
app.use(company)
app.use(jobs)
app.use(jobSeeker)
app.use(shortlistApplicant)
app.use(scheduleMeeting)
app.use(bodyParser.json())




app.listen(5000)