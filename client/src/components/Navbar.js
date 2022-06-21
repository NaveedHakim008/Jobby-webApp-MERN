//import '../style/style.css'
import { useState, useRef, useEffect } from 'react'
import { scrollTo } from 'scroll-js';
import Jobpostingform from './Jobpostingform'
import Signupoption from './Signupoption'
import Loginoption from './Loginoption'
import LoginUser from './LoginUser'
import Companylogin from './Companylogin'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                fontFamily: 'slick',
                position: "absolute",
                right: "15px",
                fontSize: "1rem",
                lineHeight: "1",
                opacity: ".75",
                color: "#f7eaea",
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                fontFamily: 'slick',
                position: "absolute",
                display: "block",
                left: "210px",
                fontSize: "33px",
                lineHeight: "1",
                opacity: ".75",
                color: "#f7eaea",
            }}
            onClick={onClick}
        />
    );
}

function Navbar(props) {
    const boxRef = useRef();

    const settings = {
        dots: false,

        infinite: true,
        speed: 150,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    const [offsetY, setOffsetY] = useState()
    const getPosition = () => {
        const y = boxRef.current.offsetTop;
        setOffsetY(y);
    }

    useEffect(() => {
        getPosition();
    }, []);

    const [openSignupoption, setopenSignupoption] = useState(false)
    const [openLoginoption, setopenLoginoption] = useState(false)
    const [openmodallogin, setopenmodallogin] = useState(false)
    const [openloginuser, setopenloginuser] = useState(false)
    const [openlogincompany, setopenlogincompany] = useState(false)





    const signup = { signupstate: setopenSignupoption, Company: 'Signup As Company', Jobseeker: 'Signup As Jobseeker' }
    const Login = { Loginstate: setopenLoginoption, setopenloginuser: setopenloginuser, setopenlogincompany: setopenlogincompany, modalopen: setopenmodallogin, Company: 'Login As Company', Jobseeker: 'Login As Jobseeker' }
    const Modal = { modalstate: setopenmodallogin, userinfo: props.info.userinfo, companyinfo: props.info.companyinfo, setopenloginuser: setopenloginuser, setopenlogincompany: setopenlogincompany }
    return (
        <>
            {!openmodallogin && <><ul className="bg-green-400 list-none py-2 text-md font-bold text-gray-100  h-1/5 border-box tracking-widest ">
                <li className='inline mx-4 font-cursive text-xl'>Jobby</li>
                <li className='inline mx-4 font-bold hover:text-gray-500 cursor-pointer' onClick={() => {
                    scrollTo(document.body, { top: offsetY, behavior: 'smooth' }).then(function () {
                        // scrolled down 600 pixels smoothly
                    });
                }}>About us</li>

                <li className='inline absolute  right-36'><button className='font-bold hover:text-gray-500' onClick={() => {
                    setopenLoginoption(false); setopenSignupoption(true);
                }}>Signup</button></li>
                <li className='inline absolute  right-16'><button className='font-bold hover:text-gray-500' onClick={() => {
                    setopenLoginoption(true);
                    setopenSignupoption(false)
                }}>Signin</button></li>

            </ul>


            </>
            }

            {openSignupoption && <Signupoption Signup={signup} />}

            {openLoginoption && <Loginoption Login={Login} />}
            {openloginuser && <LoginUser Modal={Modal} />}
            {openlogincompany && <Companylogin Modal={Modal} />}

            {!openmodallogin && <> <Slider {...settings}>


                <div className='w-screen h-screen bg-img1 bg-cover bg-center text-center bg-blend-darken text-white font-bold text-4xl pt-96 tracking-widest bg-green-200 cursor-pointer'>

                    Find Your Ideal Job on Jobby

                </div>
                <div className=' w-screen h-screen bg-img2 bg-cover bg-center bg-center text-center bg-blend-darken text-white font-bold text-4xl pt-96 tracking-widest bg-green-200 cursor-pointer'>

                    Search Jobs from different Scopes and Feilds
                </div>




            </Slider>
                <div className='h-screen bg-green-100' ref={boxRef}>
                    <div className='flex flex-row justify-center text-gray-600 font-bold text-4xl'>
                        ABOUT US
                    </div>
                    <div className='flex flex-row h-PageMiddle  justify-center items-center px-64'>

                        <div className="  h-4/5 w-3/4 text-4xl px-4 text-gray-600 align-middle text-center flex flex-row items-center   font-bold  tracking-widest">

                            "This websites aim to provide to one stop solution for all problems faced by the applicants and recruiters during hiring. Applicants can apply for the suitable jobs.Recruiters can find best person for their company all this
                            under one platform."
                        </div>

                    </div>


                </div>

            </>

            }






        </>
    )
}
export default Navbar