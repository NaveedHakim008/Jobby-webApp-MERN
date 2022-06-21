const express = require('express')
const router = express.Router()
const Appliedjobs = require('./db/Appliedjobs')
const Jobs = require('./db/Jobs')


const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })


const applyuserdata = async (req, resp) => {



    const appjob = {

        jobid: req.body.jobid,
        applicantid: req.body.applicantid,
        company: req.body.company,
        CV: req.file.path

    }
    let js = new Appliedjobs(appjob)
    let result = await js.save()
    resp.send(result)

}

router.get('/getapplicants/:key', async (req, resp) => {
    let result = await Appliedjobs.find(


        { applicantid: { $regex: req.params.key } }


    )
    if (result.length > 0)
        resp.send(result)
    else
        resp.send({ result: "No one has Applied to this Job" })
})
router.get('/countOfAppliedjob/:key',async (req,resp)=>{
    let count=await Appliedjobs.find({applicantid:{$regex:req.params.key}}).count()
    resp.send({"count":count})}
)
router.get('/getAppliedJobinfo/:key', async (req, resp) => {
    let jobIDArray = []
    let jobInfoArray = []
    let applyjobs = await Appliedjobs.find({ applicantid: { $regex: req.params.key } })
    for (let i = 0; i < applyjobs.length; i++) {
        jobIDArray.push(applyjobs[i].jobid)
    }
    for (let i = 0; i < jobIDArray.length; i++) {
    
        let jobs = await Jobs.findOne({ _id: jobIDArray[i] }, { title: 1, name: 1, _id: 0 })
        jobInfoArray.push({ title: jobs.title, name: jobs.name })

    }



    resp.send(jobInfoArray)

})
router.post('/appliedjobs', upload.single('CV'),
    applyuserdata)

module.exports = router

