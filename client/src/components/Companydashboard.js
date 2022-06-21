import { useEffect, useState } from 'react'
import ShortlistApplicantForm from './ShortlistApplicantForm'
import ScheduleMeeting from './ScheduleMeeting';

import EditJob from './EditJob'
import { useDispatch } from 'react-redux';


export default function Companydashboard(props) {
    const [currAppliedJobID, setCurrAppliedJobID] = useState()


    const editJobDispatch = useDispatch()
    const appliedJobDispatch = useDispatch()
    const scheduleMeetingDispatch = useDispatch()
    const [interviewSchedule, setInterviewSchedule] = useState([])
    const [noInterviewSchedule, setNoInterviewSchedule] = useState(false)
    const [viewInterviewSchedule, setViewInterviewSchedule] = useState(false)



    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const pdf = importAll(require.context('../../../server/upload', false, /\.(pdf|jpe?g|svg)$/));
    const [editJobInfo, setEditJobInfo] = useState({})
    const company = { name: props.Company.companyname }
    const [activejobs, setactivejobs] = useState([])
    const [applied, setapplied] = useState([])
    const [notapplied, setnotapplied] = useState(false)


    const [openactivejobs, setopenactivejobs] = useState(true)
    const [openviewapplicants, setopenviewapplicants] = useState(false)
    const [noShortlistedApplicant, setNoShortlistedApplicants] = useState(false)

    const [viewShortlistedApplicant, setViewShortlistedApplicant] = useState(false)
    const [shortlistApplicant, setShortlistApplicant] = useState([])
    const [nojobs, setnojobs] = useState(false)
    const getactivejobs = async () => {
        let result = await fetch('http://localhost:5000/activejobs', {
            method: 'post',
            body: JSON.stringify(company),
            headers: {
                'content-type': 'application/json'
            }
        })
        result = await result.json()
        if (result[0])
            setactivejobs(result)
        else
            setnojobs(true)
    }
    const reSetNotApplied = async () => {
        if (notapplied === true)
            setnotapplied(false)
    }
    const getapplied = async (jobid, x) => {

        console.log(jobid)
        let result2 = await fetch(`http://localhost:5000/shortlistcandidate/${jobid}`)
        result2 = await result2.json()

        if (result2[0]) {

            setapplied(result2)


        }
        else {
            setnotapplied(true)

        }
    }
    const editjob = async (title) => {
        console.log(title)
        let result = await fetch(`http://localhost:5000/editjob/${title}`)
        result = await result.json()

        //  setEditJobInfo(result)
        editJobDispatch({ type: "EditJob", payload: result });
    }
    const getShortlistedApplicant = async (jobid) => {
        setShortlistApplicant([])
        setNoShortlistedApplicants(false)
        let result = await fetch(`http://localhost:5000/shortlistedApplicants/${jobid}`)
        result = await result.json()
        if (result[0])
            setShortlistApplicant(result)
        else
            setNoShortlistedApplicants(true)

    }
    const getAppliedJobInfo = async (applicantid) => {
        console.log(applied)


        appliedJobDispatch({
            type: 'getShortlistinginfo', payload: applied.filter(obj => { return obj._id === applicantid })


        })
    }
    const getInterviewSchedule = async (jobid) => {
        setInterviewSchedule([])
        setNoInterviewSchedule(false)
        let result = fetch(`http://localhost:5000/getInterviewSchedule/${jobid}`)
        result = await (await result).json()
        console.log(result)
        if (result[0]) {
            setInterviewSchedule(result)
        }
        else {
            setNoInterviewSchedule(true)
        }


    }
    useEffect(() => {
        getactivejobs()





    }, [props.Company.Jobposting, props.Company.Editjob])
    useEffect(() => {
        if (currAppliedJobID) {

            reSetNotApplied()
            setapplied([])
            setTimeout(() => {
                getapplied(currAppliedJobID, "Naveed Hakim");
                //                getShortlistedApplicant(currAppliedJobID);




            }, 100)

            console.log(applied)



            setopenviewapplicants(true)
        }
    }, [props.Company.ShortlistApplicant, props.Company.ScheduleMeeting])








    return (
        <>
            {openactivejobs && !props.Company.Editjob && !props.Company.Jobposting && <div className='flex flex-row justify-center items-center h-PageMiddle border-box '>
                <div className='w-3/4  h-3/4  mx-auto overflow-y-auto border-box'>
                    <div className='flex flex-row justify-center  bg-green-200 capitalize  text-xl font-bold text-gray-500 '>

                        <div>
                            Active Jobs
                        </div>

                    </div>
                    {nojobs &&
                        <div className='flex text-4xl text-gray-400 capitalize justify-center mt-56'>
                            No Jobs Posted yet
                        </div>
                    }

                    {!nojobs &&

                        <div className="relative  sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 ">

                                <tbody>
                                    {activejobs.map((items, index, key) =>

                                        <tr className="odd:bg-green-100 even:bg-green-200" key={index}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900  ">
                                                {items.title}
                                            </th>
                                            <td className="pl-12 py-4">

                                                <button className='border-gray-500 border-2 px-2 py-1 rounded-sm hover:bg-gray-500 hover:text-green-200'
                                                    key={index}
                                                    onClick={() => {
                                                        setopenactivejobs(false); getapplied(items._id, ""); setopenviewapplicants(true); setCurrAppliedJobID(items._id); reSetNotApplied()



                                                    }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 inline"
                                                        fill="none" viewBox="0 0 24 24"
                                                        stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>View Applicants</button>
                                            </td>
                                            <td className="pl-6 py-4">
                                                <button className='border-gray-500 border-2 px-2 py-1 rounded-sm hover:bg-gray-500 hover:text-green-200 '
                                                    key={index}
                                                    onClick={() => { setopenactivejobs(false); getShortlistedApplicant(items._id); setViewShortlistedApplicant(true); setopenviewapplicants(false); setCurrAppliedJobID(items._id); }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 inline"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>View Shortlisted Applicant</button>
                                            </td>

                                            <td className="pl-6 py-4">
                                                <button key={items._id}
                                                    className="border-gray-500 border-2 px-2 py-1 rounded-sm hover:bg-gray-500 hover:text-green-200"

                                                    onClick={() => { getInterviewSchedule(items._id); setopenactivejobs(false); setViewInterviewSchedule(true); }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 inline"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    View Interview Schedule
                                                </button>
                                            </td>
                                            <td className="pl-6 py-4">
                                                <button key={items._id}
                                                    onClick={() => {
                                                        editjob(items.title);
                                                        props.Company.Seteditjob(true)
                                                    }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}>
                                                        <path strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                            </td>

                                        </tr>)}


                                </tbody>
                            </table>
                        </div>

                    }
                </div>
            </div>
            }
            {props.Company.Editjob && <EditJob Jobposting={props.Company}></EditJob>}
            {
                openviewapplicants && !props.Company.ShortlistApplicant && !props.Company.Jobposting && !props.Company.ScheduleMeeting &&

                < div className='flex flex-row justify-center items-center h-screen border-box'>
                    <div className='w-3/4  h-3/4 bg-green-200  mx-auto overflow-y-auto'>

                        <div className='flex flex-row justify-center capitalize  mb-2 text-xl font-bold text-gray-500 '>

                            <div>
                                Applicants
                                <button className="bg-transparent text-lg relative  top-2 -right-96  text-red-400 font-extrabold hover:text-red-200 "
                                    onClick={() => { setopenviewapplicants(false); setopenactivejobs(true); }}
                                ><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7"
                                    fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                        {notapplied &&
                            <div className='flex text-4xl text-gray-400 capitalize justify-center mt-56'>
                                No Applicant has Applied yet
                            </div>
                        }
                        {!notapplied &&
                            <div className="relative overflow-x-auto sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 ">

                                    <tbody>

                                        {applied.map((items, index, key) =>
                                            <tr className=" odd:bg-green-100 even:bg-green-100 " key={index}>
                                                <td className="mx-2 py-4 font-medium text-gray-900 text-center ">
                                                    {items.fullname}
                                                </td>
                                                <td className="mx-2 py-4 text-center">

                                                    <button className='border-gray-500 border-2 px-2 py-1 rounded-sm hover:bg-gray-500 hover:text-green-200'
                                                        key={index}>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg><a href={pdf[`${items._id + items.appliedcandidate.jobid}.pdf`]} target="_blank">View CV</a></button>
                                                </td>
                                                {items.appliedcandidate.status === 'Shortlisted' || items.appliedcandidate.status === 'Called For Interview' ? false : true &&
                                                    <td className=" mx-2 py-4 text-center">
                                                        <button className='border-gray-500 border-2 px-2 py-1 rounded-sm hover:bg-gray-500 hover:text-green-200 '
                                                            onClick={async () => { getAppliedJobInfo(items._id); props.Company.SetShortlistApplicant(true); }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>Shortlist Applicant
                                                        </button>
                                                    </td>
                                                }
                                                {items.appliedcandidate.status === 'Called For Interview' ? false : true &&
                                                    <td className="mx-2 py-4 text-center">
                                                        <button className='border-gray-500 border-2 px-2 py-1 rounded-sm hover:bg-gray-500 hover:text-green-200 '
                                                            onClick={() => { scheduleMeetingDispatch({ type: "getMeetingInfo", payload: items }); props.Company.SetScheduleMeeting(true); }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>Schedule Interview</button>
                                                    </td>

                                                }
                                                <td className=" mx-2  text-md font-bold text-gray-500  text-center">
                                                    Status

                                                    <span className='text-red-500 block'>
                                                        {items.appliedcandidate.status}
                                                    </span>

                                                </td>

                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div >
            }
            {props.Company.ShortlistApplicant && <ShortlistApplicantForm ShortlistApplicant={props.Company}></ShortlistApplicantForm>}
            {props.Company.ScheduleMeeting && <ScheduleMeeting ShortlistApplicant={props.Company}></ScheduleMeeting>}




            {
                viewShortlistedApplicant && !props.Company.ShortlistApplicant && !props.Company.Jobposting && !props.Company.ScheduleMeeting &&
                <div className='flex flex-row justify-center items-center h-screen border-box'>
                    <div className='w-3/4  h-3/4 bg-green-200  mx-auto overflow-y-auto'>
                        <button className="bg-transparent text-lg relative left-3/4 top-2 right-2 text-red-400 font-extrabold hover:text-red-200 "
                            onClick={() => { setViewShortlistedApplicant(false); setopenactivejobs(true); }}
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <div className='flex flex-row justify-center capitalize -mt-7 mb-2 text-xl font-bold text-gray-500 '>

                            <div>
                                Shortlisted Applicants
                            </div>

                        </div>
                        {noShortlistedApplicant &&
                            <div className='flex text-4xl text-gray-400 capitalize justify-center mt-56'>
                                No Applicant has been Shortlisted yet
                            </div>
                        }
                        {!noShortlistedApplicant &&
                            <div className="relative overflow-x-auto sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 ">



                                    <tr className="bg-green-200" >
                                        < th scope="col" className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap" >
                                            Name of Applicant
                                        </th>
                                        < th scope="col" className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap" >
                                            Shortlisted by
                                        </th>
                                        < th scope="col" className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap" >
                                            Position
                                        </th>
                                        < th scope="col" className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap" >

                                        </th>
                                        < th scope="col" className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap" >

                                        </th>
                                    </tr>

                                    {shortlistApplicant.map((items, index, key) =>
                                        <tr className="odd:bg-green-100 even:bg-green-100" key={index}>
                                            <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                                                {items.fullname}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                                                {items.appliedcandidate.name}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                                                {items.appliedcandidate.position}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a
                                                    key={index} href={pdf[`${items._id + items.appliedcandidate.jobid}.pdf`]} target="_blank">
                                                    <button className='border-gray-500 border-2 px-2 py-1 rounded-sm hover:bg-gray-500 hover:text-green-200 '><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>View CV</button></a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className='border-gray-500 border-2 px-2 py-1 rounded-sm hover:bg-gray-500 hover:text-green-200 '
                                                    onClick={() => { scheduleMeetingDispatch({ type: "getMeetingInfo", payload: items }); props.Company.SetScheduleMeeting(true) }}>

                                                    Schedule Meeting</button>
                                            </td>






                                        </tr>
                                    )}



                                </table>

                            </div>

                        }
                    </div>
                </div >
            }

            {
                viewInterviewSchedule && !props.Company.ShortlistApplicant && !props.Company.Jobposting && !props.Company.ScheduleMeeting &&
                <div className='flex flex-row justify-center items-center h-screen border-box'>
                    <div className='w-3/4  h-3/4 bg-green-200  mx-auto overflow-y-auto'>
                        <button className="bg-transparent text-lg relative left-3/4 top-2 right-2 text-red-400 font-extrabold hover:text-red-200 "
                            onClick={() => { setViewInterviewSchedule(false); setopenactivejobs(true); }}
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <div className='flex flex-row justify-center capitalize -mt-7 mb-2 text-xl font-bold text-gray-500 '>

                            <div>
                                Interview Schedule
                            </div>

                        </div>
                        {noInterviewSchedule &&
                            <div className='flex text-4xl text-gray-400 capitalize justify-center mt-56'>
                                No Interview Scheduled for this Job
                            </div>
                        }
                        {!noInterviewSchedule &&
                            <div className="relative overflow-x-auto sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 ">



                                    <tr className="bg-green-200" >
                                        < th scope="col" className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap" >
                                            Name of Applicant
                                        </th>
                                        < th scope="col" className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap" >
                                            Interview Type
                                        </th>
                                        < th scope="col" className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap" >
                                            Date
                                        </th>
                                        < th scope="col" className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap" >
                                            Time
                                        </th>


                                        < th scope="col" className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap" >
                                            Venue
                                        </th>
                                        < th scope="col" className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap" >
                                            Link
                                        </th>
                                    </tr>

                                    {interviewSchedule.map((items, index, key) =>
                                        <tr className="odd:bg-green-100 even:bg-green-100" key={index}>
                                            <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                                                {items.fullname}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                                                {items.type}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                                                {items.date}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900 ">
                                                {items.time} {items.merdianTime}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {items.venue}
                                            </td>
                                            <td className="px-6 py-4">
                                                {items.link}

                                            </td>






                                        </tr>
                                    )}



                                </table>

                            </div>

                        }
                    </div>
                </div >
            }


        </>
    )
}
