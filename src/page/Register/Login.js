import { Box } from '@mui/material'
import React from 'react'
import SideBar from '../../component/SideBar/SideBar'
import LoginCard from '../../component/Register/LoginCard'

export default function Login() {
  return (
    <Box>
      <img
        src="/assest/images/login.svg"
        style={{ position: "absolute", zIndex: "-1",height:'100%' }}
      />
      <SideBar/>
      <LoginCard/>
    </Box>
  )
}
