const express = require('express')
const router = express.Router()
const Jobseeker = require('./db/Jobseeker')
const nodemailer = require('nodemailer')

const ShortlistApplicant = require('./db/ShortlistApplicants')
const multer = require('multer')
let OTP = 0
const generateOTP = () => {


    let OTP = Math.floor(1000 + Math.random() * 9000)
    OTP = OTP.toString()


    return OTP
}

const sendOTP = async (OTP, emailAddress) => {

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

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'k190338@nu.edu.pk', // sender address
        to: emailAddress, // list of receivers
        subject: "Email Verification Code for Jobby", // Subject line
        html: `<b>The OTP code for account verfication is</b><br> <b>${OTP}<b>`, // html body
    }
    )
    console.log(info)

    //console.log("Message sent: %s", info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account

    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...




}
router.post('/Jobseekerssignup', async (req, resp) => {
    let js = new Jobseeker(req.body)
    OTP = generateOTP()
    console.log(req.body.email)
    resp.send(OTP)

    sendOTP(OTP, req.body.email)
    let result = await js.save()


})
router.post('/getOTP', async (req, resp) => {
    console.log(typeof (req.body.OTP))
    console.log(typeof (req.body.OTP))
    console.log(typeof (OTP), "entered OTP")

    if (OTP === req.body.OTP) {

        resp.send({ status: "success" })

    }
})
router.get('/usernamesearch/:key', async (req, resp) => {
    let result = await Jobseeker.find({
        '$or': [

            { username: { $regex: req.params.key } },

        ]
    })
    resp.send(result)
})

router.get('/email/:key', async (req, resp) => {
    let result = await Jobseeker.findOne({
        '$or': [

            { email: { $regex: req.params.key } },

        ]
    })
    resp.send(result)
})
router.post('/jobseekerlogin', async (req, resp) => {
    let users = await Jobseeker.findOne(req.body).select("-password")
    if (users)
        resp.send(users)
    else
        resp.send({ result: "usernot found" })
})

router.get('/shortlistcandidate/:key', async (req, resp) => {



    let shorlistcandidate = await Jobseeker.aggregate([{
        $addFields: { "_id": { "$toString": "$_id" } }
    }, { $lookup: { from: "appliedjobs", localField: "_id", foreignField: "applicantid", as: "appliedcandidate" } }, { "$unwind": "$appliedcandidate" }, { "$project": { fullname: 1, _id: 1, "appliedcandidate.jobid": 1, "appliedcandidate.status": 1 } }, { "$match": { "appliedcandidate.jobid": { $regex: req.params.key } } }])
    console.log(shorlistcandidate)
    resp.send(shorlistcandidate)
})
module.exports = router

