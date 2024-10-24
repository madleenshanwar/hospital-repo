import React from 'react'
import SideBar from '../../../component/SideBar/SideBar'
import AddTestCard from '../../../component/Services/Test/AddTestCard'
import { Box } from '@mui/material'

export default function AddTest() {
  return (
    <Box>
    <img
      src="/assest/images/test.svg"
      style={{ position: "absolute", zIndex: "-1",height:'100%' }}
    />
    <SideBar/>
    <AddTestCard/>
  </Box>
  )
}
