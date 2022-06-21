import Usernavbar from "./Usernavbar"
import { useEffect, useState } from "react"
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
function Userhomepage(props) {


    const [appliedjob, setappliedjob] = useState([])
    const [notApplied, setnotapplied] = useState(false)
    const [countApplied,setCountApplied]=useState(0)
    const [countInterviewed,setCountInterview]=useState(0)

   const getCountApplied=async(applicantid)=>{
       let result=await fetch(`http://localhost:5000/countOfAppliedjob/${applicantid}`)
       result=await result.json()
       setCountApplied(result.count)
   }
   const getCountInterview=async (applicantid)=>
   {
    let result=await fetch(`http://localhost:5000/countOfInterview/${applicantid}`)
       result=await result.json()
       setCountInterview(result.count)   
   }
    Chart.register(Tooltip, Title, ArcElement, Legend)

    const data = {
        datasets: [{
            data: [countInterviewed,(countApplied-countInterviewed)],
            backgroundColor: ["#e89a8e", "#61fad6"],
            label: "your label",



        }],
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Applying Insights'
                }
            }
        },

        labels: [" Procceded to Interview ", "Not Procceded to Interview"]
    }
    const obj = {}
    var arr = ''
    var username = localStorage.getItem('username')
    const checkusername = async (username) => {
        let result1 = await fetch(`http://localhost:5000/usernamesearch/${username}`)
        result1 = await result1.json()

        obj.applicantid = result1[0]._id
        obj.username = username
    
        getAppliedJobInfo(obj.applicantid)
        
    



    }


    
    const getAppliedJobInfo = async (applicantid) => {
        //console.log(applicantid)
        getCountInterview(obj.applicantid)
        getCountApplied(applicantid)
        let result = await fetch(`http://localhost:5000/getAppliedJobinfo/${applicantid}`)
        result = await result.json()
        console.log(result)
        
        if (result.length >= 1) {
            setappliedjob(result)

        }
        else {
            setnotapplied(true)
        }


    }
    useEffect(() => {

        checkusername(username)

    },[])
    return (
        <>


            <Usernavbar user={obj}></Usernavbar>
            <div className="flex flex-row w-full justify-start items-center h-PageMiddle inline">



                <div className=' capitalize  w -1/2 h-1/3  text-xl font-bold text-gray-500 text-center inline'>

                    <div className="-mt-32 mb-2 ml-32">
                        Applied Jobs
                    </div>


                    {notApplied &&
                        <div className='flex text-4xl text-gray-400 capitalize justify-center mt-56 ml-20'>
                            You have not applied for any job
                        </div>
                    }
                    {!notApplied &&
                        <div className="relative overflow-y-auto sm:rounded-lg ml-40">
                            <table className="w-full text-sm  text-center text-gray-500 ">



                                <tr className="bg-green-200" >
                                    < th scope="col" className="px-16 py-4 font-medium text-gray-900  whitespace-nowrap" >
                                        Job title
                                    </th>
                                    < th scope="col" className="px-16 py-4 font-medium text-gray-900  whitespace-nowrap" >
                                        Posted By
                                    </th>

                                </tr>
                                {appliedjob.map((items, index, key) =>
                                    <tr className="odd:bg-green-100 even:bg-green-100" key={index}>
                                        <td className="px-16 py-4 font-medium text-gray-900  whitespace-nowrap">
                                            {items.title}
                                        </td>
                                        <td className="px-16 py-4 font-medium text-gray-900  whitespace-nowrap">
                                            {items.name}
                                        </td>






                                    </tr>
                                )}


                            </table>

                        </div>

                    }
                </div>
                <div className="w-64 h-64 "></div>
                <div className="w-28 h-28 "></div>
                <div className=" w-chartwidth h-chartheight py-2 flex flex-row justify-center items-center -mt-32">

                    <div className=" w-4/5 h-80">
                        <p className="text-center -mt-4 text-gray-500 text-3xl text-md font-bold">Insights for Applied Jobs</p>
                        <Doughnut data={data} />
                    </div>


                </div>
            </div>









        </>
    )
}
export default Userhomepage
