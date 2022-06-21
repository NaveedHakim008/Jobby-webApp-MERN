//import '../style/style.css'
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
function EditJob(props) {


    const EditedJob = {}
    const initialvalues = useSelector(state => state.changeJobpostingform)




    const [formvalues, setformvalues] = useState({});




    const [formerrors, setformerrors] = useState({});
    const [issubmit, setissubmit] = useState(false);
    const [verify, setverify] = useState(false)



    const handleChange = (e) => {

        const { name, value } = e.target;
        setformvalues({ ...formvalues, [name]: value })



    }
    const editjob = async () => {
        let result = await fetch(`http://localhost:5000/updatejob/${formvalues.id}`, {
            method: 'put',
            body: JSON.stringify(EditedJob),
            headers: {
                'content-type': 'application/json'
            }
        })

    }

    const handleSubmit = (e) => {

        e.preventDefault();
        setformerrors(validate(formvalues))
        setissubmit(true)




    }
    useEffect(() => {
        if (!formvalues.title)
            setformvalues(initialvalues)
        else
            setformvalues(formvalues)
        if (Object.keys(formerrors).length === 0 && issubmit) {
            EditedJob.title = formvalues.title
            EditedJob.duedate = formvalues.duedate
            EditedJob.description = formvalues.description
            EditedJob.scope = formvalues.scope
            EditedJob.type = formvalues.type
            editjob()

            setformvalues({})
            props.Jobposting.Seteditjob(false)


        }

    }, [formerrors, issubmit, formvalues, formvalues, initialvalues])
    useEffect(() => {
        setTimeout(() => { setformvalues(initialvalues) }, 100)
        console.log(formvalues)


    }, [initialvalues, props.Jobposting.Editjob])
    const validate = (values) => {

        const errors = {}

        if (!values.title) {
            errors.title = 'Job Title required'
        }





        if (!values.description) {

            errors.description = 'Description required'
        }
        if (values.duedate != formvalues.duedate) {
            let curr = new Date()
            const year = parseInt(values.duedate.slice(0, 4))
            const month = parseInt(values.duedate.slice(5, 7))
            const date = parseInt(values.duedate.slice(8, 10))
            const curryear = curr.getFullYear()
            const currmonth = curr.getMonth()
            const currdate = curr.getDate()

            console.log(curryear)
            console.log(year)
            console.log(month)
            console.log(currmonth)
            console.log(date)
            console.log(currdate)

            if ((year < curryear) || (date < currdate) || (month < currmonth)) {

                errors.duedate = "please enter a valid date"
            }
        }

        return errors;
    }
    return (
        <div className="bg-green-100 h-screen">
            <div class="flex justify-center items-center h-screen">
                <div className="h-auto bg-green-400 px-4 py-4 rounded-sm w-1/3 ">
                    <div className="mx-48 font-bold text-xl text-gray-600 font-sans">Edit Job</div>
                    <button className="bg-transparent text-4xl float-right  font-sans relative -top-6 right-0 text-white font-extrabold hover:text-red-400"
                        onClick={() => { setformvalues({}); props.Jobposting.Seteditjob(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <form className="my-8 px-6" onSubmit={handleSubmit}>
                        <label className="text-sm text-red-600 font-bold">*</label>
                        <input type='text' className={` rounded-sm w-full px-3 py-2 font-md  `} name='title' onChange={handleChange} value={formvalues.title}
                        />
                        <p className="text-sm font-normal text-red-600">{formerrors.title}</p>
                        <label className="text-sm text-red-600 font-bold">*</label>
                        <textarea name='description' className="form-textarea  block w-full px-3 py-2 font-md rounded-sm" placeholder="Job Description" onChange={handleChange} value={formvalues.description}
                        ></textarea>

                        <p className="text-sm font-normal text-red-500">{formerrors.description}</p>

                        <label htmlFor='scope'><span className="text-sm font-normal text-red-500">*</span>JobScope:</label><br />
                        <select name='scope' values={formvalues.scope} className="rounded-sm w-2/3 px-3 py-1 font-md" onChange={handleChange}
                        >
                            <option value='Health'>Health</option>
                            <option value='Education'>Education</option>
                            <option value='IT'>IT</option>
                            <option value='Administration'>Administration</option>
                        </select><br />
                        <label htmlFor='type'><span className="text-sm font-normal text-red-500">*</span>JobType:</label><br />
                        <select name='type' className="rounded-sm w-2/3 px-3 py-1 font-md" onChange={handleChange}
                            value={formvalues.type}
                        >
                            <option value='Part Time'>Part Time</option>
                            <option value='Internship'>Internship</option>
                            <option value='Full Time'>Full Time</option>
                        </select><br />
                        <label htmlFor=''><span className="text-sm font-normal text-red-500">*</span>DueDate</label><br />
                        <input type='Date'
                            className="rounded-sm w-2/3 px-3 py-1 font-md" name='duedate' onChange={handleChange} value={formvalues.duedate} />
                        <p className="text-sm font-normal text-red-500">{formerrors.duedate}</p>
                        <button className="my-2 w-full bg-gray-500  text-white rounded-sm text-lg  text-center">Save</button><br />
                    </form>
                </div>
            </div>

        </div>
    )

}
export default EditJob