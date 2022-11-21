import React from 'react'
import { TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate } from "react-router-dom"
import './regularSignin.scss'

const validationSchema = values => {
  let errors = {}
  if (!values.email) {
    errors.email = "Required"
  }
  if (!values.password) {
    errors.password = "Required"
  }
}

const RegularSignin = () => {
  const initialValues = {
    email: "",
    password: ""
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      alert(values)
    }
  })
  const navigate = useNavigate()

  return (
    <div className="back_canvas">
      <div className="container">
        <Button className="home_btn" onClick={() => { navigate('/') }}>home</Button>
        <div className="regular_main">
          <div className="regular_login_holder">
            <h2 className="regular_login_title">company login</h2>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                id="email"
                label="Email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                variant="standard"
                sx={{ margin: "5px 0px" }} />
              <TextField
                id="password"
                label="Password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                variant="standard"
                sx={{ margin: "5px 0px" }} />
              <Button variant="contained" type="submit" sx={{ margin: "15px 0px" }}>login</Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RegularSignin
