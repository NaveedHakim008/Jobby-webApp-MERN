import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar'
import Signuppage from './components/Signuppage'
import Usersignuppage from './components/Usersignuppage'
import Userhomepage from './components/Userhomepage'
import Companyhomepage from './components/Companyhomepage'
import AccountVerification from './components/AccountVerification'
import ActiveJobs from './components/ActiveJobs';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from './store';
import './index.css'
import { Provider } from 'react-redux'




export default function App() {
  const [userinfo, setuserinfo] = useState("")
  const [companyinfo, setcompanyinfo] = useState("")
  const info = { companyinfo: setcompanyinfo, userinfo: setuserinfo }

  return (

    <>

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navbar info={info} />} />
          <Route exact path="/jobseekersignup" element={<Usersignuppage setinfo={setuserinfo} />} />
          <Route exact path="/Userhomepage" element={<Userhomepage Userinfo={userinfo} />} />
          <Route exact path="/companysignup" element={<Signuppage Companyinfo={setcompanyinfo} />} />
          <Route exact path="/Companyhomepage" element={<Companyhomepage Companyinfo={companyinfo} />} />
          <Route exact path="/AccountVerification" element={<AccountVerification />} />
          <Route exact path="/ActiveJobs" element={<ActiveJobs />} />





        </Routes>
      </BrowserRouter>
    </>
  )
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

