import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AccountVerification() {

    const location = useLocation()
    var Navigate = useNavigate()
    var confirmOTP = false





    const initialvalue = {
        OTP: ""
    }

    const [formvalues, setformvalues] = useState(initialvalue);
    const [formerrors, setformerrors] = useState({});
    const [issubmit, setissubmit] = useState(false);
    const handleChange = (e) => {

        const { name, value } = e.target;
        setformvalues({ ...formvalues, [name]: value })



    }
    const verifyOTP = async () => {
        console.log("hello ")

        let result = await fetch(`http://localhost:5000/getOTP`, {
            method: 'post',
            body: JSON.stringify(formvalues),
            headers: {
                'content-type': 'application/json'
            }
        })


        result = await result.json()

        if (result.status === 'success') {

            localStorage.setItem("username", location.state.username)
            Navigate('../Userhomepage', { replace: true })

        }
        else {
            setformerrors({ OTP: 'Invalid OTP enter OTP again or go back to signup page and enter valid personal information' })
        }

    }






    const handleSubmit = (e) => {

        e.preventDefault();


        setissubmit(true)




    }
    useEffect(() => {


        if (issubmit) {

            verifyOTP()


        }




    })

    return (
        <>
            <div className="bg-green-100 w-screen items-center  flex justify-center h-screen">

                <div className="h-96 bg-green-400 px-4 py-4  rounded-sm w-1/3 ">
                    <div className="font-bold text-xl text-gray-600 text-center ml-16 font-sans">Enter OTP For Account Verification

                    </div>

                    <form className="my-2 px-6 my-24 " onSubmit={handleSubmit}>
                        <p className="text-sm font-normal text-red-400 mx-28 ">{formerrors.OTP}</p>

                        <div className="flex flex-row justify-center items-center">




                            <input type='text' className={` rounded-sm w-1/2 px-3 py-3 mx-2 font-md text-sm text-center`} name='OTP' onChange={handleChange} value={formvalues.OTP} maxlength="4"
                            />

                        </div>   <button className="my-2 bg-transparent  py-1cd text-white w-1/2 bg-gray-500 rounded-sm text-lg px-1 text-center mx-28">Verify</button><br />









                    </form>
                </div>
            </div>


        </>
    )

}


