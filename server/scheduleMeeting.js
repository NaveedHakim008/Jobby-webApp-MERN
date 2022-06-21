const express = require('express')
const router = express.Router()
const ScheduleMeeting = require('./db/ScheduleMeeting')
const company = require('./db/Company')
const jobSeeker = require('./db/Jobseeker')
const jobs = require('./db/Jobs')
const AppliedJobs = require('./db/Appliedjobs')
const nodemailer = require('nodemailer')

router.get("/countOfInterview/:key", async (req, resp) => {
    let count = await ScheduleMeeting.find({ applicantid: { $regex: req.params.key } }).count()
    resp.send({ "count": count })
})
router.post('/scheduleMeeting', async (req, resp) => {

    let scheduleMeeting = new ScheduleMeeting(req.body)
    let appliedjobs = await AppliedJobs.updateOne({ '$and': [{ "applicantid": req.body.applicantid }, { "jobid": req.body.jobid }] },
        { $set: { "status": "Called For Interview" } })
    console.log(appliedjobs)


    notifyJobseeker(req.body)
    notifyCompany(req.body)



    let result = await scheduleMeeting.save()
    resp.send(result)



})
router.get('/getInterviewSchedule/:key', async (req, resp) => {

    let applicantidArray = []
    let infoOfInterviewedApplicant = []

    let InterveiwedApplicants = await ScheduleMeeting.find({ "jobid": { $regex: req.params.key } }, { _id: 0 })


    for (let i = 0; i < InterveiwedApplicants.length; i++) {
        applicantidArray.push(InterveiwedApplicants[i].applicantid)
    }
    console.log(applicantidArray)
    let nameofInterviewedApplicant = await jobSeeker.find({ "_id": { $in: applicantidArray } })
    console.log(nameofInterviewedApplicant)

    for (let i = 0; i < InterveiwedApplicants.length; i++) {
        const temp = {}
        temp.date = InterveiwedApplicants[i].date
        temp.time = InterveiwedApplicants[i].time
        temp.link = InterveiwedApplicants[i].link
        temp.venue = InterveiwedApplicants[i].venue
        temp.merdianTime = InterveiwedApplicants[i].merdianTime
        temp.fullname = nameofInterviewedApplicant[i].fullname
        temp.type = InterveiwedApplicants[i].type

        // temp.fullname = nameofInterviewedApplicant[i].fullname

        infoOfInterviewedApplicant.push(temp)


    }
    console.log(infoOfInterviewedApplicant)
    resp.send(infoOfInterviewedApplicant)

})
const notifyJobseeker = async (MeetingInfo) => {

    let jobseekerinfo = await jobSeeker.findOne({ "_id": MeetingInfo.applicantid }, { _id: 0, email: 1, fullname: 1 })
    let job = await jobs.findOne({ _id: MeetingInfo.jobid }, { title: 1, _id: 0, name: 1 })

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: false, // true for 465, false for other ports
        auth: {
            user: 'k190338@nu.edu.pk', // generated ethereal user
            pass: '@n@v$$d123' // generated ethereal password
        },
    }, (err) => {
        console.log(err)
    });
    let emailContent = ""
    if (MeetingInfo.link === '') {
        emailContent = `Dear ${jobseekerinfo.fullname},
        We are glad to tell you that your Interview is scheduled on ${MeetingInfo.date} at  ${MeetingInfo.time} ${MeetingInfo.merdianTime} in our ${MeetingInfo.venue}`

    }
    else {
        emailContent = `Dear ${jobseekerinfo.fullname},
        We are glad to tell you that your  Online Interview is scheduled on ${MeetingInfo.date} at  ${MeetingInfo.time} ${MeetingInfo.merdianTime} the link for the interview is 
        ${MeetingInfo.link}`
    }

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'k190338@nu.edu.pk', // sender address
        to: jobseekerinfo.email, // list of receivers
        subject: `Interview Scheduled for Position of ${job.title} at ${job.name}`, // Subject line
        text: emailContent // html body
    }
    )




}
const notifyCompany = async (MeetingInfo) => {

    let job = await jobs.findOne({ _id: MeetingInfo.jobid }, { title: 1, _id: 0, name: 1 })

    let companyinfo = await company.findOne({ name: job.name }, { _id: 0, email: 1, name: 1 })
    console.log(companyinfo)
    let jobseekerinfo = await jobSeeker.findOne({ "_id": MeetingInfo.applicantid }, { _id: 0, email: 1, fullname: 1 })
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: false,
        auth: {
            user: 'k190338@nu.edu.pk ',
            pass: '@n@v$$d123'
        },
    }, (err) => {
        console.log(err)
    });
    let emailContent = ""
    if (MeetingInfo.link === '') {
        emailContent = `Dear ${companyinfo.name},
        This is to inform you that you have scheduled interview with ${jobseekerinfo.fullname} for the position of ${job.title}  on ${MeetingInfo.date} at  ${MeetingInfo.time} ${MeetingInfo.merdianTime} in your ${MeetingInfo.venue}`

    }
    else {
        emailContent = `Dear ${companyinfo.name},
        This is to inform you that you have scheduled interview with ${jobseekerinfo.fullname} for the position of ${job.title} on  ${MeetingInfo.date} at  ${MeetingInfo.time} ${MeetingInfo.merdianTime} the link for the interview is 
        ${MeetingInfo.link}`
    }

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'k190338@nu.edu.pk', // sender address
        to: companyinfo.email, // list of receivers
        subject: `Interview Scheduled for Position of ${job.title}`, // Subject line
        text: emailContent // html body
    }
    )
}










module.exports = router
