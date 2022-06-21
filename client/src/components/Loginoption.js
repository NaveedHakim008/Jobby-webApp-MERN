//import '../style/style.css'
import { useState } from 'react'
function Loginoption(props) {

    return (

        <>

            <div className="h-28 absolute -right-2 inline  bg-green-300 opacity-90 w-60 rounded-sm z-20">
                <button className="bg-transparent text-lg absolute  right-2   text-red-400 font-extrabold hover:text-red-200"
                    onClick={() => { props.Login.Loginstate(false) }}
                ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <button className="text-sm mx-12 px-1 my-3 bg-transparent text-green-500 border-green-500 border-2  rounded-sm hover:bg-green-500 hover:text-white" onClick={() => { props.Login.modalopen(true); props.Login.setopenloginuser(true); props.Login.Loginstate(false) }}>{props.Login.Jobseeker}</button>
                <button className="text-sm mx-12 px-1 my-3 bg-transparent text-green-500  border-green-500 border-2  rounded-sm hover:bg-green-500 hover:text-white" onClick={() => { props.Login.modalopen(true); props.Login.setopenlogincompany(true); props.Login.Loginstate(false) }} >{props.Login.Company}</button>

            </div>


        </>
    )

}
export default Loginoption