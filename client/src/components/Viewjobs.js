import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Axios from 'axios'
function Viewjobs(props) {



    let location = useLocation()
    console.log(location)


    let data = new FormData()
    const [btnvalue, setbtnvalue] = useState('View Description')
    const [descriptiondisplay, setdescriptiondisplay] = useState('hidden')
    const [formdisplay, setformdisplay] = useState('block')
    const [jobs, setjobs] = useState([])
    const [user, setuser] = useState([])

    const [file, setfile] = useState("")
    const [curr, setcurr] = useState()
    const [nojobs, setnojobs] = useState(false)
    var block = "block"
    var hidden = "hidden"

    const changedisplay = (index) => {


        //  if (id === btnid && (id + index.toString() + "1") === descid && (id + index.toString()) === formid) {

        if (curr === index) {
            if (btnvalue === 'View Description') {
                setbtnvalue('Close Description')
            }
            else {
                setbtnvalue('View Description')

            }

        }
    }


    const handleChange = (e) => {
        setfile(e.target.files[0])

    }
    const getjobs = async () => {





        let jobs = await fetch(`http://localhost:5000/getjobs/${location.state.applicantid}`)
        jobs = await jobs.json()
        if (jobs[0])
            setjobs(jobs)
        else
            setnojobs(true)



    }

    const handleSubmit = async (e, compname, jobid) => {

        e.preventDefault();




        data.append("company", compname)
        data.append("jobid", jobid)
        data.append("applicantid", location.state.applicantid)
        data.append("CV", file, location.state.applicantid + jobid + ".pdf")

        const res = await Axios.post('http://localhost:5000/appliedjobs', data)
        window.location.reload(true)

    }
    const getJobByScope = async (e) => {

        let result = await fetch('http://localhost:5000/getJobByScope', {
            method: 'post',
            body: JSON.stringify({ applicantid: location.state.applicantid, jobscope: e.target.value }),
            headers: {
                'content-type': 'application/json'
            }
        })
        result = await result.json()

        setjobs(result)
    }

    useEffect(() => {
        getjobs()





    }, [])
    return (
        <>
            {!nojobs && <div className='mx-auto   w-2/3 h-20 border-box py-2 px-16'>
                <label htmlFor="" className='font-bold text-gray-500 '>Search by Jobscope</label><br />
                <select name='jobscope' className="rounded-sm w-1/5  text-white mt-2 font-md bg-green-300 " onChange={getJobByScope}>
                    <option value='All'>All</option>
                    <option value='Health'>Health</option>
                    <option value='Education'>Education</option>
                    <option value='IT'>IT</option>
                    <option value='Administration'>Administration</option>
                </select><br />
            </div>}
            {
                nojobs && <div className='text-4xl flex flex-row justify-center items-center h-screen text-gray-500'>
                    No New Jobs Posted
                </div>
            }
            {jobs.map((items, index, key) =>


                <div className="w-2/3 h-44 rounded-sm bg-green-300 mx-auto my-8 py-2 text-gray-500" key={items._id}>
                    <div className=' relative h-16 w-4/5 mx-auto'>
                        <p className='ml-28 text-md font-bold mb-2 mx-auto' >Company:{items.name}<span className='ml-64 text-md font-bold mx-auto'>Jobtitle:{items.title}</span></p>
                        <p className='ml-28 text-md font-bold'>Last Date to Apply:{items.duedate}<button className='ml-48 bg-red-400 text-green-200 rounded-sm px-2  hover:text-gray-500  '
                            onClick={(e) => { setcurr(index); changedisplay(index) }} id={items._id.toString()}>{btnvalue}</button></p>
                        <div className={`ml-28 mt-2 overflow-y-auto rounded-sm pl-2 font-bold ${curr === index ? btnvalue === 'View Description' ? hidden : block : hidden} h-20 w-4/5 relative bg-green-100`} id={items._id.toString() + index.toString() + "1"} key={items._id}>
                            {items.description}
                        </div>
                        <span>
                            <form className={`my-4 ${curr === index ? btnvalue === 'Close Description' ? hidden : block : block}`} onSubmit={(e) => { handleSubmit(e, items.name, items._id) }} id={items._id.toString() + index.toString()}>
                                <input className='bg-gray-500 px-2 rounded-sm text-green-200 py-1 ml-28' type='file' accept='.pdf' onChange={(e) => { handleChange(e) }} required />

                                <button className="bg-btn-color px-2 rounded-sm text-green-200 pt-1 ml-8 px-3 text-md py-1  hover:text-gray-500">Apply</button>

                            </form>
                        </span>

                    </div>
                </div >
            )
            }
        </>
    )
}
export default Viewjobs