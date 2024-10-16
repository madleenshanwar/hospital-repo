import React from 'react'
import SideBar from '../../component/SideBar/SideBar'
import { Box } from '@mui/material'
import Patient from '../../component/Patient/Patient'
import PatientList from '../../component/Patient/PatientList'

export default function PatientPage() {
  return (
    <Box>
    <SideBar/>
    <Box sx={{display:'flex',flexDirection:'column',gap:3,alignItems:'center'}}>
    <Patient/>
    <PatientList/>
    </Box>
   </Box>
  )
}
