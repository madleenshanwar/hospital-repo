import { Box, Button, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react'
import SideBar from '../../component/SideBar/SideBar';
import RaysPage from './Rays/RaysPage';
import TestPage from './Test/TestPage';

export default function ServicesInfo() {
  const[service,setService]=useState('')
  return (
    <Box>
      <SideBar />
    <Box sx={{display:'flex',gap:2,flexDirection:'column',marginTop:'80px', alignItems: "center"}}>
      <TextField
          id="outlined-select-currency"
          select
          label="please select your service"
          onChange={(e)=>{setService(e.target.value)
          }}
          value={service}
          name="service"
          sx={{ width: "250px" }}
        >
          <MenuItem value="rays">Rays</MenuItem>
          <MenuItem value="test">Test</MenuItem>
        </TextField>
        <Box>
        {service==='rays'?<RaysPage/>:""}
        {service==='test'?<TestPage/>:''}
        </Box>
    </Box>
    </Box>
  )
}
