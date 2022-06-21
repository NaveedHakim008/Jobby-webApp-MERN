//import '../style/style.css'
import Jobpostingform from './Jobpostingform'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Companynavbar(props) {
    let navigate = useNavigate()

    console.log(props)


    return (
        <>

            <ul className="bg-green-400 list-none py-2 text-md font-bold text-gray-100 mx-auto ">
                <li className='inline mx-4 font-cursive text-xl'>Jobby</li>

                <li className='inline'><button className='font-bold hover:text-gray-500 inline' onClick={() => {
                    props.Company.Setjobposting(true)
                }}>Post Job</button></li>
                <li className='inline absolute  right-36'><button className='font-bold hover:text-gray-500 inline' ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>{props.Company.companyname}</button></li>
                <li className='inline absolute  right-16'><button className='font-bold hover:text-gray-500' onClick={() => {

                    navigate('../', { replace: true })
                }}>Logout</button></li>


            </ul>


        </>

    )
}
export default Companynavbar

