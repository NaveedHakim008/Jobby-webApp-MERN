import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import '../style/style.css'
function Usersignupage(props) {

    var navigate = useNavigate()
    var OTP = 0
    const initialvalue = {

        fullname: "",
        username: "",
        email: "",
        qualification: "Intermediate",
        password: "",
        confirmpassword: "",

    };
    const [formvalues, setformvalues] = useState(initialvalue);
    const [formerrors, setformerrors] = useState({});
    const [issubmit, setissubmit] = useState(false);
    const [uniqueusername, setuniqueusername] = useState([])
    const [uniqueemail, setuniqueemail] = useState([])

    const handleChange = (e) => {

        const { name, value } = e.target;
        setformvalues({ ...formvalues, [name]: value })



    };
    const passdata = async () => {
        let result = await fetch('http://localhost:5000/jobseekerssignup', {
            method: 'post',
            body: JSON.stringify(formvalues),
            headers: {
                'content-type': 'application/json'
            }
        })
        OTP = await result.json()



    }

    const checkusername = async (username) => {
        let result1 = await fetch(`http://localhost:5000/usernamesearch/${username}`)
        result1 = await result1.json()
        setuniqueusername(result1)
    }
    const checkemail = async (email,) => {
        let result2 = await fetch(`http://localhost:5000/email/${email}`)

        result2 = await result2.json()
        console.log(result2)
        setuniqueemail(result2)
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        setformerrors(validate(formvalues))
        setissubmit(true)




    };
    useEffect(() => {

        if (Object.keys(formerrors).length === 0 && issubmit) {

            passdata()
            navigate('../AccountVerification', { state: { username: formvalues.username } }, { replace: true })


        }

    }, [formerrors, issubmit, formvalues, passdata])
    const validate = (values) => {

        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.fullname) {
            errors.fullname = 'Full Name required'
        }
        checkusername(values.username)
        if (uniqueusername.length === 0) {
            if (!values.username) {
                errors.username = 'Username required'
            }
        }
        else {
            errors.username = 'username already exist enter a new username'
        }
        checkemail(values.email)
        if (uniqueemail.length === 0) {
            if (!values.email) {
                errors.email = 'Email required'
            }
            else if (!regex.test(values.email)) {
                errors.email = "This is not a valid email format!";
            }
        }
        else {
            errors.email = 'email already exist enter a new email'
        }
        if (values.password !== values.confirmpassword) {
            errors.confirmpassword = "passwords are not similar"
        } if (!values.password) {
            errors.password = 'password required'
        }

        return errors;
    }

    return (
        <>
            <div className="bg-green-100 h-screen">
                <div class="flex justify-center items-center h-screen">
                    <div className="h-auto bg-green-400 px-4 py-4 rounded-sm w-1/3 ">
                        <div className=" font-bold text-xl text-gray-600 font-sans text-center">Enter SignUp Info</div>

                        <form className="my-8 px-6" onSubmit={handleSubmit}>
                            <label className="text-sm text-red-600 font-bold">*</label><br />
                            <input type="text"
                                id="fullname"
                                name="fullname"
                                placeholder=" Full Name"
                                value={formvalues.fullname}
                                onChange={handleChange}
                                className="w-1/2 py-1" />
                            <p className="text-sm font-normal text-red-600">{formerrors.fullname}</p>
                            <label className="text-sm text-red-600 font-bold">*</label><br />
                            <input type="text" id="username"
                                name="username"
                                placeholder="User Name"
                                className="w-1/2 py-1"
                                value={formvalues.username}
                                onChange={handleChange}
                            />

                            <p className="text-sm font-normal text-red-600">{formerrors.username}</p>
                            <label className="text-sm text-red-600 font-bold">*</label> <br />

                            <input type="text"
                                id="email"
                                name="email"
                                placeholder="Email Address"
                                className="w-1/2 py-1"
                                value={formvalues.email}
                                onChange={handleChange} />
                            <p className="text-sm font-normal text-red-600">{formerrors.email}</p>

                            <label htmlFor='Qualification'><span className="text-sm font-normal text-red-500">*</span>Qualification:</label><br />


                            <select name="qualification" className="w-1/2 py-1" onChange={handleChange}>
                                <option value="Intermediate" className="text-md">Intermediate</option>
                                <option value="Graduate" className="text-md">Graduate</option>
                                <option value="PostGraduate" className="text-md">Post Graduate</option>
                            </select>
                            <p className="text-sm font-normal text-red-600">{formerrors.qualification}</p>

                            <label className="text-sm text-red-600 font-bold">*</label><br />
                            <input type="password"

                                name="password"
                                className="w-1/2 py-1"
                                onChange={handleChange} placeholder="Password" />
                            <p className="text-sm font-normal text-red-600">{formerrors.password}</p>
                            <label className="text-sm text-red-600 font-bold">*</label><br />
                            <input type="password"
                                className="w-1/2 py-1"
                                name="confirmpassword"
                                onChange={handleChange} placeholder="Confirm Password" />
                            <p className="text-sm font-normal text-red-600">{formerrors.confirmpassword}</p>

                            <button className="my-2 w-full bg-gray-500  text-white rounded-sm text-lg  text-center">Sign Up</button><br />
                        </form>
                    </div>
                </div>

            </div>


        </>
    )
}
export default Usersignupage