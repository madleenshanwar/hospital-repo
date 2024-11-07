import React from 'react'
import { Box } from '@mui/material'
import ProvideTestCard from '../../../Component/ProvideService/Test/ProvideTestCard'
import SideBar from '../../../Component/SideBar/SideBar'

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
