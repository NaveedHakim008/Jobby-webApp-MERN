//import '../style/style.css'
import { useState, useEffect } from 'react'
import Companynavbar from "./Companynavbar"
import Companydashboard from './Companydashboard'
import Jobpostingform from './Jobpostingform'
function Companyhomepage() {




    const [jobposting, setjobposting] = useState(false)
    const [editjob, seteditjob] = useState(false)
    const [shortlistApplicant, setShortlistApplicant] = useState(false)
    const [scheduleMeeting, setScheduleMeeting] = useState(false)
    const company = { companyname: localStorage.getItem('companyName'), Setjobposting: setjobposting, Jobposting: jobposting, Editjob: editjob, Seteditjob: seteditjob, ShortlistApplicant: shortlistApplicant, SetShortlistApplicant: setShortlistApplicant, ScheduleMeeting: scheduleMeeting, SetScheduleMeeting: setScheduleMeeting }

    return (
        <>
            {!(editjob || jobposting || shortlistApplicant || scheduleMeeting) && <Companynavbar Company={company}></Companynavbar>}
            {!jobposting && <Companydashboard Company={company}></Companydashboard>}
            {jobposting && <Jobpostingform Jobposting={company}></Jobpostingform>}
        </>)
}
export default Companyhomepage