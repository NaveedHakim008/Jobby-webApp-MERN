
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import '../style/style.css'
function Companylogin(props) {
    var navigate = useNavigate()
    const initialvalue = {

        email: "",
        password: ""
    }
    const [formvalues, setformvalues] = useState(initialvalue);
    const [formerrors, setformerrors] = useState({});
    const [issubmit, setissubmit] = useState(false);
    const [verify, setverify] = useState(false)
    const [companyname, setcompanyname] = useState("")
    const handleChange = (e) => {
        const { name, value } = e.target;
        setformvalues({ ...formvalues, [name]: value })
    };
    const handleSubmit = (e) => {

        e.preventDefault();
        setformerrors(validate(formvalues))
        setissubmit(true)




    };
    const verifycompany = async () => {

        let result = await fetch('http://localhost:5000/companylogin', {
            method: 'post',
            body: JSON.stringify(formvalues),
            headers: {
                'content-type': 'application/json'
            }
        })
        result = await result.json()
        console.log(result)
        if (result.name) {
            setcompanyname(result.name)
            localStorage.setItem('companyName', result.name)
            setverify(true)
        }
    }
    useEffect(() => {

        if (Object.keys(formerrors).length === 0 && issubmit) {

            verifycompany()
            if (verify) {
                props.Modal.companyinfo(companyname)
                navigate('../Companyhomepage', { replace: true })
            }
        }

    }, [formerrors, issubmit, formvalues, verifycompany])
    const validate = (values) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = 'Email required'
        }
        else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }

        if (!values.password)
            errors.password = 'password required'
        return errors
    }
    return (

        <>
            <div className="bg-green-100 h-screen">
                <div className="flex justify-center items-center h-screen">
                    <div className="h-42 w-1/4 bg-green-400 rounded-sm  py-4 rounded-md">
                        <div className="font-bold text-xl text-gray-600 font-sans text-center ">Sign in To Your Account</div>
                        <button className="bg-transparent text-lg  ml-8 relative -top-8 left-80  text-red-400 font-extrabold hover:text-red-200" onClick={() => { props.Modal.modalstate(false); props.Modal.setopenlogincompany(false) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <form className="my-8" onSubmit={handleSubmit}>

                            <input type='text' className=' rounded-sm     text-md px-4 py-2 mx-24' name='email' placeholder='xyz@gmail.com' onChange={handleChange} />
                            <p className="text-sm font-normal text-red-500 mx-24">{formerrors.email}</p><br />

                            <input type='password' className='rounded-sm   text-md px-4 py-2 mx-24' name='password' placeholder='Password' onChange={handleChange} />

                            <p className="text-sm font-normal text-red-500 mx-24">{formerrors.password}</p>


                            <button className="my-2 mx-24 px-20  text-center  relative text-xl bg-gray-500  text-white rounded-sm ">Signin</button><br />
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Companylogin