const express = require('express')
const router = express.Router()
const ScheduleMeeting = require('./db/ScheduleMeeting')
const AppliedJobs = require('./db/Appliedjobs')
const ShortlistApplicant=require('./db/ShortlistApplicants')
const Jobseeker = require('./db/Jobseeker')
router.post('/shortlistApplicant', async (req, resp) => {
    let shortlistapplicant = new ShortlistApplicant(req.body)
    let result = await shortlistapplicant.save()
    let appliedjobs = await AppliedJobs.updateOne({ "applicantid": req.body.applicantid, "jobid": req.body.jobid }, { $set: { "status": "Shortlisted" } })
    console.log(appliedjobs)

    resp.send(result)


})
router.get('/shortlistedApplicants/:key', async (req, resp) => {

    let applicantidArray = []
    const obj = await ScheduleMeeting.find({ "jobid": { $regex: req.params.key } })
    for (let i = 0; i < obj.length; i++) {
        applicantidArray.push(obj[i].applicantid)
    }
    console.log(applicantidArray)

    let shorlistcandidate = await Jobseeker.aggregate([{
        $addFields: { "_id": { "$toString": "$_id" } }
    }, { $lookup: { from: "shortlistapplicants", localField: "_id", foreignField: "applicantid", as: "appliedcandidate" } }, { "$unwind": "$appliedcandidate" }, { "$project": { fullname: 1, _id: 1, "appliedcandidate.jobid": 1, "appliedcandidate.name": 1, "appliedcandidate.position": 1 } }, { "$match": { "appliedcandidate.jobid": { $regex: req.params.key }, "_id": { $nin: applicantidArray } } }])
    console.log(shorlistcandidate)
    resp.send(shorlistcandidate)
})
module.exports = router

