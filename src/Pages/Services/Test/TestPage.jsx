import { Box } from '@mui/material'
import React from 'react'
import Test from '../../../component/Services/Test/Test'
import TestList from '../../../component/Services/Test/TestList'

export default function TestPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
      }}
    >
        <Test/>
        <TestList/>
    </Box>
  )
}
