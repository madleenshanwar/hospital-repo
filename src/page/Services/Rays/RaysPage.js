import { Box } from '@mui/material'
import React from 'react'
import SideBar from '../../../component/SideBar/SideBar'
import Rays from '../../../component/Services/Rays/Rays'
import RaysList from '../../../component/Services/Rays/RaysList'

export default function RaysPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
      }}
    >
        <Rays/>
        <RaysList/>
    </Box>
  )
}
