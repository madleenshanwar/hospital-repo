import { Box, Button } from '@mui/material';
import React from 'react'
import SideBar from '../../component/SideBar/SideBar';

export default function ServicesInfo() {
  return (
    <Box>
      <SideBar />
    <Box sx={{display:'flex',gap:3, margin: "70px auto", alignItems: "center",
        justifyContent: "center"}}>
       <Button
          variant="contained"
          sx={{ background: "#00ACB1", p: 1, fontWeight: "bold", width: "150px" }}
        >
          Test
        </Button>
        <Button
          variant="contained"
          sx={{ background: "#00ACB1", p: 1, fontWeight: "bold", width: "150px" }}
        >
          Rays
        </Button>
    </Box>
    </Box>
  )
}
