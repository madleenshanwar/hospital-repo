import { Box } from '@mui/material'
import React from 'react'
import SideBar from '../../component/SideBar/SideBar'
import AddSchedulesCard from '../../component/Schedules/AddSchedulesCard'

export default function AddSchedules() {
  return (
    <Box>
      <img
        src="/assest/images/schedule.svg"
        style={{ position: "absolute", zIndex: "-1",height:'100%' }}
      />
      <SideBar/>
      <AddSchedulesCard/>
    </Box>
  )
}
