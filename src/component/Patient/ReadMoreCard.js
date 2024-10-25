import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
const rows = [
    {
      id: 1,
      first_name: "Sara",
      last_name: "Gamal",
      address: "Homs/syria",
      birthday: "10/10/2010",
      gender: "Female",
      blood_group: "O-",
      allergies: "",
      marital_status: "single",
      children_number: "",
      habits: "",
      medical_history: "",
    },
    {
      id: 2,
      first_name: "Sara",
      last_name: "Gamal",
      address: "Homs/syria",
      birthday: "10/10/2010",
      gender: "Female",
      blood_group: "O-",
      allergies: "",
      marital_status: "single",
      children_number: "",
      habits: "",
      medical_history: "",
    },
    {
      id: 3,
      first_name: "Sara",
      last_name: "Gamal",
      address: "Homs/syria",
      birthday: "10/10/2010",
      gender: "Female",
      blood_group: "O-",
      allergies: "",
      marital_status: "single",
      children_number: "",
      habits: "",
      medical_history: "",
    },
    {
      id: 4,
      first_name: "Sara",
      last_name: "Gamal",
      address: "Homs/syria",
      birthday: "10/10/2010",
      gender: "Female",
      blood_group: "O-",
      allergies: "",
      marital_status: "single",
      children_number: "",
      habits: "",
      medical_history: "",
    },
    {
      id: 5,
      first_name: "Sara",
      last_name: "Gamal",
      address: "Homs/syria",
      birthday: "10/10/2010",
      gender: "Female",
      blood_group: "O-",
      allergies: "",
      marital_status: "single",
      children_number: "",
      habits: "",
      medical_history: "",
    },
  ];
export default function ReadMoreCard() {
    const {index}=useParams()
    const [patient, setPatient] = useState({});
      useEffect(()=>{
        setPatient(rows.find(el=>el.id===parseInt(index)))
        console.log(rows.find(el=>el.id===parseInt(index)))
      },[])
  return (
    <Box
      component="form"
    //   onSubmit={handleSubmit}
      sx={{
        margin: "70px auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.7)",
        border: "1px solid #00ACB1",
        height: "fit-content",
        maxWidth: "600px",
      }}
    >
   <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemText
        //   primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                component="div"
                variant="body2"
                sx={{ color: 'text.primary',fontWeight:'bold',fontSize:'x-large'}}
              >
                {patient.first_name+' '+patient.last_name}
              </Typography>
              <Typography
                component="div"
                variant="body2"
                sx={{ color: 'text.primary'}}
              >Birthday: {patient.birthday}</Typography>
               <Typography
                component="div"
                variant="body2"
                sx={{ color: 'text.primary'}}
              >Address: {patient.address}</Typography>
              <Typography
                component="div"
                variant="body2"
                sx={{ color: 'text.primary'}}
              >Marital Status: {patient.marital_status}</Typography>
                <Typography
                component="div"
                variant="body2"
                sx={{ color: 'text.primary'}}
              >Allergies: {patient.allergies}</Typography>
                 <Typography
                component="div"
                variant="body2"
                sx={{ color: 'text.primary'}}
              >Children Number: {patient.children_number}</Typography>
                  <Typography
                component="div"
                variant="body2"
                sx={{ color: 'text.primary'}}
              >Habits: {patient.habits}</Typography>
                  <Typography
                component="div"
                variant="body2"
                sx={{ color: 'text.primary'}}
              >Medical History: {patient.medical_history}</Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </List>
        </Box>
  )
}
