import { Box } from '@mui/joy'
import React from 'react'
import UpdateSchedulesCard from '../../Component/Schedules/UpdateSchedulesCard'

export default function UpdateSchedules() {
  return (
    <Box>
    <img
      src="/assest/images/patient.svg"
      style={{ position: "absolute", zIndex: "-1",height:'100%' ,top:'0'}}
    />
    <UpdateSchedulesCard/>
    </Box>
  )
}
