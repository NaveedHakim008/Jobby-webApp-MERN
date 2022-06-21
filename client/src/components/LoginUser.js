
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import '../style/style.css'
function LoginUser(props) {
    var navigate = useNavigate()
    const initialvalue = {

        username: "",
        confirmpassword: ""
    }
    const [formvalues, setformvalues] = useState(initialvalue);
    const [formerrors, setformerrors] = useState({});
    const [issubmit, setissubmit] = useState(false);
    var Verify=false
    const handleChange = (e) => {
        const { name, value } = e.target;
        setformvalues({ ...formvalues, [name]: value })
    };
    const handleSubmit = (e) => {

        e.preventDefault();
        setformerrors(validate(formvalues))
        setissubmit(true)




    };
    const verifyuser = async () => {
        let result = await fetch('http://localhost:5000/jobseekerlogin', {
            method: 'post',
            body: JSON.stringify(formvalues),
            headers: {
                'content-type': 'application/json'
            }
        })
        result = await result.json()
        if (result.fullname)
        {
            Verify=true
            setTimeout(() => {

                localStorage.setItem('username', formvalues.username)
                navigate('../Userhomepage', { replace: true })
            },50);
        }
        else
        {
            if(window.confirm("credential are wrong enter again"))
            {
                   navigate('../',{replace:true})
            }
            else
            {
                     
            }
        }
        console.log(Verify)
    }
    useEffect(() => {

        if (Object.keys(formerrors).length === 0 && issubmit) {

            verifyuser()
            console.log(Verify)
        }

    }, [formerrors, issubmit])
    const validate = (values) => {
        const errors = {}
        if (!values.username)
            errors.username = 'username required'
        if (!values.password)
            errors.password = 'password required'
        return errors
    }
    return (

        <>
            <div className="bg-green-100 h-screen">
                <div class="flex justify-center items-center h-screen">
                    <div className="h-42 w-1/4 bg-green-400 rounded-sm  py-4 rounded-sm  ">
                        <div className='flex justify-center font-bold text-lg text-gray-600'>
                            Signin To Your Account
                        </div>
                        <button className="bg-transparent text-lg  ml-8 relative -top-8 left-80  text-red-400 font-extrabold hover:text-red-200" onClick={() => { props.Modal.modalstate(false); props.Modal.setopenloginuser(false) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <form className="my-8" onSubmit={handleSubmit}>

                            <input type='text' className='rounded-sm    text-md px-4 py-2 mx-24 my-2' name='username' placeholder='Username' onChange={handleChange} />
                            <p className="text-sm font-normal text-red-500 mx-24">{formerrors.username}</p>
                            <input type='password' className='rounded-sm     text-md px-4 py-2 mx-24' name='password' placeholder='Password' onChange={handleChange} />

                            <p className="text-sm font-normal text-red-500 mx-24">{formerrors.password}</p>
                            {Verify && <p className="text-sm font-normal text-red-500 mx-24">Credential are wrong</p>}

                            <button className="my-2 mx-24 px-20 text-xl bg-gray-500   rounded-sm px-1 text-white font-normal">Signin</button><br />
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}
export default LoginUser