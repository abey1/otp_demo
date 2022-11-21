import React from 'react'
import { useFormik } from 'formik';
import { useState } from "react"
import { Button, TextField } from '@mui/material';
import { autentication } from "../firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../App';
import './otpSignin.scss';

const validate = values => {
  const errors = {}
  if (!values.phoneNo) {
    errors.phoneNo = "Required"
  } else if (values.phoneNo.length < 12) {
    errors.phoneNo = "The phone number must be 12 digits"
  }

  // if (!values.otp) {
  //   errors.otp = "Required"
  // }

  return errors;
}

const OtpSignin = () => {
  const value = useContext(AppContext)
  const navigate = useNavigate();
  const [formExpanded, setFormExpanded] = useState(false)
  const requestOtp = ({ phoneNo }) => {
    console.log(phoneNo);
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(autentication, phoneNo, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
      });
  }
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.

      }
    }, autentication);
  }
  const handleOtpChange = (e) => {
    const otp = e.target.value
    if (otp.length === 6) {
      //verify otp
      let confirmationResult = window.confirmationResult
      confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        const user = result.user;
        value.setUser(user)
        value.setIsAuth(true)
        localStorage.setItem("auth_key", JSON.stringify(user))
        console.log(user);
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
    }
    formik.handleChange(e)
  }
  const formik = useFormik({
    initialValues: {
      phoneNo: '',
      otp: '',
    },
    validate
    ,
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      setFormExpanded(true)
      generateRecaptcha()
      requestOtp({ phoneNo: values.phoneNo })
    },
  });
  return (
    <div className="back_canvas">
      <div className="container">
        <Button className="home_btn" onClick={() => { navigate('/') }}>home</Button>
        <div className="otp_main">
          <section className='otp_login_holder'>
            <form onSubmit={formik.handleSubmit}>
              <h2 className="otp_login_title">signin with phone number</h2>
              <TextField
                error={formik.errors.phoneNo}
                id="phoneNo"
                name="phoneNo"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phoneNo}
                label="Phone Number"
                variant="standard"
                sx={{ margin: "5px 0px" }}
                helperText={formik.errors.phoneNo ? formik.errors.phoneNo : null} />
              {formExpanded ? <>
                <TextField
                  error={formik.errors.otp}
                  id="otp"
                  name="otp"
                  type="text"
                  onChange={(e) => { handleOtpChange(e) }}
                  value={formik.values.otp}
                  label="OTP"
                  variant="standard"
                  sx={{ margin: "5px 0px" }}
                  helperText={formik.errors.otp ? formik.errors.otp : "please enter the one time pin sent to your phone"} />
              </> :
                <Button className="btn_request_otp" variant="contained" type="submit" sx={{ margin: "15px 0px", width: "100%" }}>Request OTP</Button>
              }
              <div id="recaptcha-container"></div>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default OtpSignin
