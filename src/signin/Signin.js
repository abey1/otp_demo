import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Button } from '@mui/material'
import PasswordIcon from '@mui/icons-material/Password';
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate } from 'react-router-dom'
import GoogleButton from 'react-google-button';
import './signin.scss'
import { AppContext } from '../App';



const Signin = () => {
  const values = useContext(AppContext)
  const navigate = useNavigate()
  const { googleSignin } = values
  const handleGoogleSignin = async () => {
    try {
      await googleSignin()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="back_canvas">
      <div className="container">
        <Button className="home_btn" onClick={() => { navigate('/') }}>home</Button>
        <div className="signin_main">
          <div className="signin_login_holder">
            <h2 className="signin_title">choose the login method you want</h2>
            <Button
              className='signin_btn'
              variant='contained'
              onClick={(e) => { navigate('/regular_signin') }}>
              <KeyIcon />
              <div className="in_button">
                regular login
              </div>
            </Button>
            <Button
              className='signin_btn'
              variant='contained'
              onClick={(e) => { navigate('/otp_signin') }}
              sx={{ display: "flex", justifyContent: "space-between" }}>
              <PasswordIcon />
              <div className="in_button">
                otp login
              </div>
            </Button>
            <GoogleButton className='signin_btn' onClick={() => { handleGoogleSignin() }} />
          </div>

        </div>
      </div>
    </div>

  )
}

export default Signin
