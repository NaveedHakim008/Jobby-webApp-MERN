require('./db/config')
const cors = require('cors')

const express = require('express')
const router = express.Router()
const Jobs = require('./db/Jobs')
const Appliedjobs = require('./db/Appliedjobs')
router.post('/postjob', async (req, resp) => {
    let js = new Jobs(req.body)
    let result = await js.save()
    resp.send(result)

})
router.get('/getjobs/:key', async (req, resp) => {

    let arr = []
    const obj = await Appliedjobs.find({ applicantid: { $regex: req.params.key } })
    for (let i = 0; i < obj.length; i++) {
        arr.push(obj[i].jobid.toString())
    }
    let jobs = await Jobs.find({ _id: { $nin: arr } })
    if (jobs.length > 0) {
        resp.send(jobs)
    }
    else {
        resp.send({ result: 'no jobs posted yet' })
    }
})
router.post('/activejobs', async (req, resp) => {
    const activejobs = await Jobs.find(req.body)
    if (activejobs.length > 0)
        resp.send(activejobs)
    else
        resp.send({ result: 'no jobs posted yet' })
})
router.post('/getJobByScope', async (req, resp) => {
    let arr = []
    const obj = await Appliedjobs.find({ applicantid: req.body.applicantid })
    for (let i = 0; i < obj.length; i++) {
        arr.push(obj[i].jobid.toString())
    }
    if (req.body.jobscope === 'All') {
        const getJobsByScope = await Jobs.find({ _id: { $nin: arr } })
        resp.send(getJobsByScope)
    }
    else {
        const getJobsByScope = await Jobs.find({ _id: { $nin: arr }, scope: req.body.jobscope })
        resp.send(getJobsByScope)
    }

})
router.put('/updatejob/:key', async (req, resp) => {
    let editjob = await Jobs.updateOne({ _id: req.params.key }, { $set: req.body })
})
router.get('/editjob/:key', async (req, resp) => {
    let jobs = await Jobs.findOne({ title: { $regex: req.params.key } })
    console.log(jobs)
    resp.send(jobs)
})
module.exports = router