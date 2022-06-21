
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
function ScheduleMeeting(props) {

    const meetingInfo = useSelector(state => state.MeetingInfo)
    const EditedJob = {}
    const [onSite, setOnSite] = useState(true)
    const [Remote, setRemote] = useState(false)

    const initialvalue = {
        date:"",
        time: "",
        venue: "",
        link: "",
        type: "On-Site",
        merdianTime: 'AM',
        jobid: meetingInfo.jobid,
        applicantid: meetingInfo.applicantid

    }

    const [formvalues, setformvalues] = useState(initialvalue);
    const [formerrors, setformerrors] = useState({});
    const [issubmit, setissubmit] = useState(false);
    const handleChange = (e) => {

        const { name, value } = e.target;
        setformvalues({ ...formvalues, [name]: value })



    }
    const scheduleMeeting = async () => {
        let result = await fetch('http://localhost:5000/scheduleMeeting', {
            method: 'post',
            body: JSON.stringify(formvalues),
            headers: {
                'content-type': 'application/json'
            }
        })
        console.log(result)

    }

    const handleSubmit = (e) => {

        e.preventDefault();
        setformerrors(validate(formvalues))
        setissubmit(true)




    }
    useEffect(() => {
        if (formvalues.type === 'Remote') {
            setOnSite(false)
            setRemote(true)
        }
        else {
            setOnSite(true)
            setRemote(false)
        }

        if (Object.keys(formerrors).length === 0 && issubmit) {



            scheduleMeeting()


            props.ShortlistApplicant.SetScheduleMeeting(false)


        }

    },[issubmit,formerrors,formvalues])
    const validate = (values) => {

        const errors = {}

        if (!values.time) {
            errors.time = 'Time Required'
        }

        
        if (values.type === 'On-Site') {
            if (!values.venue) {
                errors.venue = 'Meeting Venue Required'
            }

        }
        else if (values.type === 'Remote') {
            if (!values.link) {
                errors.link = 'Meeting Link  Required'
            }

        }
        if (values.date) {
            let curr = new Date()
            console.log(values.date)
            const year = parseInt(values.date.slice(0, 4))
            const month = parseInt(values.date.slice(5, 7))
            const date = parseInt(values.date.slice(8, 10))
            const curryear = curr.getFullYear()
            const currmonth = curr.getMonth()
            const currdate = curr.getDate()

            console.log(curryear)
            console.log(year)
            console.log(month)
            console.log(currmonth)
            console.log(date)
            console.log(currdate)

            if ((year < curryear) || (month < currmonth)) {

                errors.date = "please enter a valid date"
            }
            else {
            
                if (date < currdate) {
                    console.log("hello")
                    errors.date = "please enter a valid date"
                }
            

        }
    }
         else{
            errors.date = 'please enter duedate'
        }



        return errors;
    }
    return (
        <>
            <div className="bg-green-100 w-screen items-center  flex justify-center h-screen">

                <div className="h-88 bg-green-400 px-4 py-4  rounded-sm w-96 ">
                    <div className="font-bold text-xl text-gray-600 text-center ml-16 font-sans">Schedule Meeting
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 inline ml-20 text-red-400 hover:text-red-300 cursor-pointer  relative -top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} onClick={() => { props.ShortlistApplicant.SetScheduleMeeting(false) }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                    </div>

                    <form className="my-2 px-6" onSubmit={handleSubmit}>
                        <label className="text-sm text-red-400 font-bold">*</label>
                        <label className="text-sm ">Date</label>
                        <input type='Date' className={` rounded-sm w-full px-3 py-2 font-md text-sm  `} name='date' onChange={handleChange} value={formvalues.date} placeholder='Name of Company Employee Shortlisting'
                        /><br />
                        <p className="text-sm font-normal text-red-400">{formerrors.date}</p>
                        <label className="text-sm text-red-400 font-bold">*</label>
                        <label className="text-sm  ">Time</label><br />
                        <input type='text' className={` rounded-sm  px-3 py-2 font-md text-sm mr-2 w-1/3 `} name='time' onChange={handleChange} value={formvalues.time}
                        />
                        <select name="merdianTime" className="px-3 py-2 text-sm " onChange={handleChange}>
                            <option value="AM" className="text-sm">AM</option>
                            <option value="PM" className="text-sm">PM</option>
                        </select><br />
                        <p className="text-sm font-normal text-red-400">{formerrors.time}</p>
                        <label className="text-sm text-red-400 font-bold">*</label>
                        <label className="text-sm">Type Of Meeting</label><br />
                        <select name="type" className="px-3 py-2 text-sm " onChange={handleChange} value={formvalues.type}>
                            <option value="On-Site" className="text-sm">On-Site</option>
                            <option value="Remote" className="text-sm">Remote</option>
                        </select><br />
                        {onSite && <>
                            <label className="text-sm text-red-400 font-bold">*</label>
                            <label className="text-sm">Meeting Venue</label><br />
                            <input type='text' className={` rounded-sm  px-3 py-2 font-md text-sm mr-2 w-full `} name='venue' onChange={handleChange} value={formvalues.venue} />
                            <p className="text-sm font-normal text-red-400">{formerrors.venue}</p>

                        </>}

                        {Remote && <>
                            <label className="text-sm text-red-400 font-bold">*</label>
                            <label className="text-sm">Meeting Link</label><br />
                            <input type='text' className={` rounded-sm  px-3 py-2 font-md text-sm mr-2 w-full `} name='link' onChange={handleChange} value={formvalues.link} />
                            <p className="text-sm font-normal text-red-400">{formerrors.link}</p>

                        </>}




                        <button className="my-2 bg-transparent  py-1 text-white w-full bg-gray-500 rounded-sm text-lg px-1">Submit</button><br />
                    </form>
                </div>
            </div>


        </>
    )

}
export default ScheduleMeeting
