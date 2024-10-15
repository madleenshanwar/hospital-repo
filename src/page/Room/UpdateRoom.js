import { Box } from '@mui/material'
import React from 'react'
import UpdateRoomCard from '../../component/Room/UpdateRoomCard'

export default function UpdateRoom() {
  return (
    <Box>
    <img
      src="/assest/images/room.svg"
      style={{ position: "absolute", zIndex: "-1",height:'100%',top:0 }}
    />
    <UpdateRoomCard/>
  </Box>
  )
}
