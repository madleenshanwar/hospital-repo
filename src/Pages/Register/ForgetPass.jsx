import React from 'react'
import ForgetPassCard from '../../Component/Register/ForgetPassCard'
import { Box } from '@mui/material'

export default function ForgetPass() {
  return (
    <Box>
      <img
        src="/assest/images/forgot_password.svg"
        style={{ position: "absolute", zIndex: "-1",height:'100%' }}
      />
      <ForgetPassCard/>
    </Box>
  )
}
