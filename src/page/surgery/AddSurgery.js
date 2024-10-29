import { Box } from '@mui/material'
import React from 'react'
import SideBar from '../../component/SideBar/SideBar'
import AddSurgeryCard from '../../component/surgery/AddSurgeryCard'

export default function AddSurgery() {
  return (
    <Box>
    <img
      src="/assest/images/surgery.jpg"
      style={{ position: "absolute", zIndex: "-1",height:'89%',top:'70px' }}
    />
    <SideBar/>
    <AddSurgeryCard/>
  </Box>
  )
}
