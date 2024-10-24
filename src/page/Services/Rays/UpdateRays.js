import React from 'react'
import UpdateRaysCard from '../../../component/Services/Rays/UpdateRaysCard'
import { Box } from '@mui/material'

export default function UpdateRays() {
  return (
    <Box>
    <img
     src="/assest/images/rays.svg"
     style={{ position: "absolute", zIndex: "-1",height:'89%',top:'70px' }}
    />
    <UpdateRaysCard/>
    </Box>
  )
}
