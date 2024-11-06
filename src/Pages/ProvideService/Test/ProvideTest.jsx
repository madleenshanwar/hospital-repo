import React from 'react'
import SideBar from '../../../component/SideBar/SideBar'
import AddTestCard from '../../../component/Services/Test/AddTestCard'
import { Box } from '@mui/material'
import ProvideTestCard from '../../../Component/ProvideService/Test/ProvideTestCard'

export default function ProvideTest() {
  return (
    <Box>
    <img
      src="/assest/images/test.svg"
      style={{ position: "absolute", zIndex: "-1",height:'100%' }}
    />
    <SideBar/>
    <ProvideTestCard/>
  </Box>
  )
}
