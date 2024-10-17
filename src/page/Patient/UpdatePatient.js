import React from 'react'
import UpdatePatientCard from '../../component/Patient/UpdatePatientCard'
import { Box } from '@mui/material'

export default function UpdatePatient() {
  return (
    <Box>
    <img
      src="/assest/images/patient.svg"
      style={{ position: "absolute", zIndex: "-1",height:'100%',top:0 }}
    />
    <UpdatePatientCard/>
  </Box>
  )
}
