import React from 'react'
import SideBar from '../../component/SideBar/SideBar'
import Department from '../../component/Department/Department'
import { Box } from '@mui/material'

export default function DepartmentPage() {
  return (
    <Box sx={{display:'flex'}}>
     <SideBar/>
     <Department/>
    </Box>
  )
}
