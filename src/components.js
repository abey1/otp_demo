
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const SigninProtectedRoute = ({ auth }) => {
  return (!auth ? <Outlet /> : <Navigate to="/dashboard" replace />)
}
const DashboardProtectedRoute = ({ auth }) => {
  return (auth ? <Outlet /> : <Navigate to="/" replace />)
}

export { SigninProtectedRoute, DashboardProtectedRoute }


