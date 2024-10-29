import { Box } from '@mui/material'
import React from 'react'
import UpdateSurgeryCard from '../../component/surgery/UpdateSurgeryCard'

export default function UpdateSurgery() {
  return (
    <Box>
      <img
        src="/assest/images/surgery.jpg"
        style={{ position: "absolute", zIndex: "-1", height: "100%", top: 0 }}
      />
      <UpdateSurgeryCard />
    </Box>
  )
}
