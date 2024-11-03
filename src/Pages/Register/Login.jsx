import { Box } from '@mui/material'
import React from 'react'
import LoginCard from '../../component/Register/LoginCard'

export default function Login() {
  return (
    <>
      <img
        src="/assest/images/login.svg"
        style={{ position: "absolute", zIndex: "-1",top:0,height:'100%' }}
      />
      <LoginCard/>
    </>
  )
}
