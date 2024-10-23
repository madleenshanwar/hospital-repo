import { Box } from '@mui/material'
import React from 'react'
import SideBar from '../../component/SideBar/SideBar'
import Schedules from '../../component/Schedules/Schedules'
import SchedulesList from '../../component/Schedules/SchedulesList'

export default function SchedulesPage() {
  return (
    <Box>
    <SideBar />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
      }}
    >
        <Schedules/>
        <SchedulesList/>
    </Box>
  </Box>)
}
