import { Box } from '@mui/material'
import React from 'react'
import UpdateTestCard from '../../../component/Services/Test/UpdateTestCard'

export default function UpdateTest() {
  return (
    <Box>
    <img
     src="/assest/images/test.svg"
     style={{ position: "absolute", zIndex: "-1",height:'100%',top:'0' }}
    />
    <UpdateTestCard/>
    </Box>
  )
}
