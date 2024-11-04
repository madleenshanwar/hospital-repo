import { Box, Button, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import RaysPage from './Rays/RaysPage';
import TestPage from './Test/TestPage';
import SideBar from '../../Component/SideBar/SideBar';

export default function ServicesInfo() {
  const[service,setService]=useState('')
  useEffect(()=>{
    setService(localStorage.getItem('service'))
  },[service])
  return (
    <Box>
      <SideBar />
    <Box sx={{display:'flex',gap:2,flexDirection:'column',marginTop:'80px', alignItems: "center"}}>
      <TextField
          id="outlined-select-currency"
          select
          label="please select your service"
          onChange={(e)=>{setService(e.target.value)
            localStorage.setItem('service',e.target.value)
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
