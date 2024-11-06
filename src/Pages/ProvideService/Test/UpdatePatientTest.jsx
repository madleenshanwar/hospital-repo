import { Box } from '@mui/material'
import React from 'react'
import UpdatePatientTestCard from '../../../Component/ProvideService/Test/UpdatePatientTestCard'

export default function UpdatePatientTest() {
  return (
    <Box>
    <img
     src="/assest/images/test.svg"
     style={{ position: "absolute", zIndex: "-1",height:'100%',top:'0' }}
    />
    <UpdatePatientTestCard/>
    </Box>
  )
}
