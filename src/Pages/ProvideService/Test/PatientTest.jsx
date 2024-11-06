import { Box } from '@mui/material'
import React from 'react'
import TestService from '../../../Component/ProvideService/Test/TestService'
import ProvideTestList from '../../../Component/ProvideService/Test/ProvideTestList'

export default function PatientTest() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
      }}
    >
        <TestService/>
        <ProvideTestList/>
    </Box>
  )
}
