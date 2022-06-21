
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
function ShortlistApplicantForm(props) {

    const shortlistinginfo = useSelector(state => state.setShortlistinginfo)
    const EditedJob = {}


    const initialvalue = {
        name: '',
        position: '',
        jobid: shortlistinginfo.jobid,
        applicantid: shortlistinginfo.applicantid

    }

    const [formvalues, setformvalues] = useState(initialvalue);
    const [formerrors, setformerrors] = useState({});
    const [issubmit, setissubmit] = useState(false);
    const handleChange = (e) => {

        const { name, value } = e.target;
        setformvalues({ ...formvalues, [name]: value })



    }
    const shortlistApplicant = async () => {
        let result = await fetch(`http://localhost:5000/shortlistApplicant`, {
            method: 'post',
            body: JSON.stringify(formvalues),
            headers: {
                'content-type': 'application/json'
            }
        })
        console.log(result)

    }

    const handleSubmit = (e) => {

        e.preventDefault();
        setformerrors(validate(formvalues))
        setissubmit(true)




    }
    useEffect(() => {

        if (Object.keys(formerrors).length === 0 && issubmit) {

            shortlistApplicant()


            props.ShortlistApplicant.SetShortlistApplicant(false)


        }

    }, [formerrors, issubmit, formvalues])
    const validate = (values) => {

        const errors = {}

        if (!values.name) {
            errors.name = 'Name Required'
        }

        if (!values.position) {

            errors.position = 'Position required'
        }


        return errors;
    }
    return (
        <div className="bg-green-100 w-screen items-center  flex justify-center h-screen">

            <div className="h-88 bg-green-400 px-4 py-4  rounded-sm w-96 ">
                <div className="font-bold text-xl text-gray-600 text-center ml-16 font-sans">Shortlist Applicant
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 inline ml-20 text-red-400 hover:text-red-300 cursor-pointer  relative -top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} onClick={() => { props.ShortlistApplicant.SetShortlistApplicant(false) }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </div>

                <form className="my-2 px-6" onSubmit={handleSubmit}>
                    <lable className="text-sm text-red-400 font-bold">*</lable>
                    <input type='text' className={` rounded-sm w-full px-3 py-2 font-md text-sm  `} name='name' onChange={handleChange} value={formvalues.name} placeholder='Name of Company Employee Shortlisting'
                    />
                    <p className="text-sm font-normal text-red-400">{formerrors.name}</p>
                    <lable className="text-sm text-red-400 font-bold">*</lable>
                    <input type='text' className={` rounded-sm w-full px-3 py-2 font-md text-sm `} name='position' onChange={handleChange} value={formvalues.position}
                        placeholder='Position of Company Employee Shortlisting'
                    />
                    <p className="text-sm font-normal text-red-400">{formerrors.position}</p>

                    <button className="my-2 bg-transparent border-2 border-white text-white rounded-sm text-lg px-1 hover:border-gray-600 hover:text-gray-600">Submit</button><br />
                </form>
            </div>


        </div>
    )

}
export default ShortlistApplicantForm
