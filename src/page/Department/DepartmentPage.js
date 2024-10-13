import React from 'react'
import SideBar from '../../component/SideBar/SideBar'
import Department from '../../component/Department/Department'
import { Box } from '@mui/material'
import DepartmentList from '../../component/Department/DepartmentList'

export default function DepartmentPage() {
  return (
    <Box>
     <SideBar/>
     <Box sx={{display:'flex',flexDirection:'column',gap:3,alignItems:'center'}}>
     <Department/>
     <DepartmentList/>
     </Box>
    </Box>
  )
}
