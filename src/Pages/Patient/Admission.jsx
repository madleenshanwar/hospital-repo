import React from 'react'
import AdmissionCard from '../../Component/Patient/AdmissionCard'
import { Box } from '@mui/material'
import SideBar from '../../component/SideBar/SideBar'

export default function Admission() {
  return (
    <Box>
      <img
        src="/assest/images/patient.svg"
        style={{ position: "absolute", zIndex: "-1", top: 0,bottom:0,height:'100%' }}
      />
      <SideBar/>
      <AdmissionCard/>
    </Box>
  )
}
