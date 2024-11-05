import React from 'react'
import AdmissionCard from '../../Component/Patient/AdmissionCard'
import SideBar from '../../Component/SideBar/SideBar'
import { Box } from '@mui/material'

export default function Admission() {
  return (
    <Box>
      <img
        src="/assest/images/patient.svg"
        style={{ position: "absolute", zIndex: "-1",height:'100%' }}
      />
      <SideBar/>
      <AdmissionCard/>
    </Box>
  )
}
