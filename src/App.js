// Import the functions you need from the SDKs you need

// import { useFormik } from 'formik';
// import { useState } from "react"
// import { Button, TextField } from '@mui/material';
// import { autentication } from "./firebase-config";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import './App.scss';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBZK-Qu1z3K30C_nsiufl-GE58VtPiU4hc",
//   authDomain: "otpdemo-f2bc8.firebaseapp.com",
//   projectId: "otpdemo-f2bc8",
//   storageBucket: "otpdemo-f2bc8.appspot.com",
//   messagingSenderId: "501389192134",
//   appId: "1:501389192134:web:ca28c639b864455cf760c7",
//   measurementId: "G-D5F3GV22WB"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

// const validate = values => {
//   const errors = {}
//   if (!values.phoneNo) {
//     errors.phoneNo = "Required"
//   } else if (values.phoneNo.length < 12) {
//     errors.phoneNo = "The phone number must be 12 digits"
//   }

//   // if (!values.otp) {
//   //   errors.otp = "Required"
//   // }

//   return errors;
// }
import { useState, useEffect } from 'react'
import { SigninProtectedRoute, DashboardProtectedRoute } from './components'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import OtpSignin from './signin/OtpSignin'
import Signin from './signin/Signin'
import RegularSignin from './signin/RegularSignin'
import Dashboard from './dashboard/Dashboard'
import LandingPage from './landingPage/LandingPage'
import { createContext } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth'
import { autentication } from "./firebase-config"
const AppContext = createContext()

function App() {
  const [user, setUser] = useState({})
  const logOut = () => {
    signOut(autentication)
    localStorage.removeItem('auth_key')
    setIsAuth(false)
  }
  useEffect(
    () => {
      const unsubscribe = onAuthStateChanged(autentication, (currentUser) => {
        setUser(currentUser)
        if (currentUser !== null) {
          localStorage.setItem('auth_key', JSON.stringify(currentUser))
          setIsAuth(true)
        }
      })
      return () => { unsubscribe() }
    }, []
  )
  const [isAuth, setIsAuth] = useState(() => {
    console.log(localStorage.getItem("auth_key"));
    return (localStorage.getItem("auth_key") !== null);
  })
  const googleSignin = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(autentication, provider)
  }
  // const [formExpanded, setFormExpanded] = useState(false)
  // const requestOtp = ({ phoneNo }) => {
  //   console.log(phoneNo);
  //   const appVerifier = window.recaptchaVerifier;
  //   signInWithPhoneNumber(autentication, phoneNo, appVerifier)
  //     .then((confirmationResult) => {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       window.confirmationResult = confirmationResult;
  //       // ...
  //     }).catch((error) => {
  //       // Error; SMS not sent
  //       // ...
  //     });
  // }
  // const generateRecaptcha = () => {
  //   window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  //     'size': 'invisible',
  //     'callback': (response) => {
  //       // reCAPTCHA solved, allow signInWithPhoneNumber.

  //     }
  //   }, autentication);
  // }
  // const handleOtpChange = (e) => {
  //   const otp = e.target.value
  //   if (otp.length === 6) {
  //     //verify otp
  //     let confirmationResult = window.confirmationResult
  //     confirmationResult.confirm(otp).then((result) => {
  //       // User signed in successfully.
  //       const user = result.user;
  //       console.log(user);
  //       // ...
  //     }).catch((error) => {
  //       // User couldn't sign in (bad verification code?)
  //       // ...
  //     });
  //   }
  //   formik.handleChange(e)
  // }
  // const formik = useFormik({
  //   initialValues: {
  //     phoneNo: '',
  //     otp: '',
  //   },
  //   validate
  //   ,
  //   onSubmit: values => {
  //     // alert(JSON.stringify(values, null, 2));
  //     setFormExpanded(true)
  //     generateRecaptcha()
  //     requestOtp({ phoneNo: values.phoneNo })
  //   },
  // });

  return (
    <AppContext.Provider value={{ isAuth: isAuth, setIsAuth: setIsAuth, googleSignin: googleSignin, logOut: logOut, user: user, setUser: setUser }}>
      <BrowserRouter>
        <Routes>
          <Route element={<SigninProtectedRoute auth={isAuth} />}>
            <Route path="/" element={<LandingPage />} ></Route>
            <Route path="/signin" element={<Signin />} ></Route>
            <Route path="/otp_signin" element={<OtpSignin />} ></Route>
            <Route path="/regular_signin" element={<RegularSignin />} ></Route>
          </Route>
          <Route element={<DashboardProtectedRoute auth={isAuth} />}>
            <Route path="/dashboard" element={<Dashboard />}>

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export { AppContext }
export default App;
