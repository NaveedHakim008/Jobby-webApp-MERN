import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import '../style/style.css'
function Signuppage(props) {
  var navigate = useNavigate()
  const initialvalue = {

    name: "",
    address: "",
    email: "",
    password: "",
    confirmpassword: ""
  };
  const [formvalues, setformvalues] = useState(initialvalue);
  const [formerrors, setformerrors] = useState({});
  const [issubmit, setissubmit] = useState(false);
  const [uniqueemail, setuniqueemail] = useState([])
  const [uniquename, setuniquename] = useState([])

  const handleChange = (e) => {

    const { name, value } = e.target;
    setformvalues({ ...formvalues, [name]: value })


  };
  const passdata = async () => {
    await fetch('http://localhost:5000/companysignup', {
      method: 'post',
      body: JSON.stringify(formvalues),
      headers: {
        'content-type': 'application/json'
      }
    })
  }
  const checkname = async (name) => {
    let result1 = await fetch(`http://localhost:5000/company/${name}`)
    result1 = await result1.json()
    setuniquename(result1)
  }
  const checkemail = async (email) => {
    let result2 = await fetch(`http://localhost:5000/companyemail/${email}`)
    result2 = await result2.json()
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
      localStorage.setItem('companyName', formvalues.name)
      { navigate('../Companyhomepage', { replace: true }) }

    }

  }, [formerrors, issubmit, formvalues])
  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    checkname(values.name)
    if (uniquename.length === 0) {
      if (!values.name) {
        errors.name = 'Company Name required'
      }
    }
    else {
      errors.name = 'company exists enter a new company name'
    }
    if (!values.address) {
      errors.address = 'Address required'
    }

    if (!values.email) {
      errors.email = 'Email required'
    }
    else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
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
            <div className=" font-bold text-xl text-gray-600 font-sans text-center">Enter Company Info</div>

            <form className="my-8 px-6" onSubmit={handleSubmit}>
              <label className="text-sm text-red-600 font-bold">*</label><br />
              <input type="text"
                id="name"
                name="name"
                placeholder=" Name"
                className="w-1/2 py-1"
                value={formvalues.name}
                onChange={handleChange}
              />
              <p className="text-sm font-normal text-red-600">{formerrors.name}</p>


              <label className="text-sm text-red-600 font-bold">*</label><br />

              <textarea name="address"
                className="form-textarea py-1 block w-1/2"
                id="address"
                row="3"
                col="20"
                value={formvalues.address}
                placeholder="address"
                onChange={handleChange}></textarea>
              <p className="text-sm font-normal text-red-600">{formerrors.address}</p>


              <label className="text-sm text-red-600 font-bold">*</label> <br />

              <input type="text"
                id="email"
                name="email"
                placeholder="Email Address"
                className="w-1/2 py-1"
                value={formvalues.email}
                onChange={handleChange} />
              <p className="text-sm font-normal text-red-600">{formerrors.email}</p>


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
  );
}
export default Signuppage