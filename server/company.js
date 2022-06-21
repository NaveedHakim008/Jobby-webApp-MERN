const express = require('express')
const router = express.Router()
const Company = require('./db/Company')
router.post('/companysignup', async (req, resp) => {
    let js = new Company(req.body)
    let result = await js.save()
    resp.send(result)

})
router.get('/company/:key', async (req, resp) => {
    let result = await Company.find({
        '$or': [

            { name: { $regex: req.params.key } },

        ]
    })
    resp.send(result)
})
router.get('/companyemail/:key', async (req, resp) => {
    let result = await Company.find({
        '$or': [

            { email: { $regex: req.params.key } },

        ]
    })
    resp.send(result)
})
router.post('/companylogin', async (req, resp) => {
    let comp = await Company.findOne(req.body).select("-password")
    if (comp)
        resp.send(comp)
    else
        resp.send({ result: "company not found" })
})
module.exports = router