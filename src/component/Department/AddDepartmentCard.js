import Title from "@mui/icons-material/Title";
import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
    name:Yup.string()
    .required("Department name is required")
    .max(25, "must contain at least 25 letters")
   ,
//    headDepartment:Yup.string()
//    .required("You must select an option")
//    .oneOf('Invalid selection')
  });
export default function AddDepartmentCard() {
    const[department,setDepartment]=useState({
        name:'',
        headDepartment:['George',"Amjad","Sara"]
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment((prevD) => ({
          ...prevD,
          [name]: value,
        }));
      };
      const route=useNavigate();
      //validation 
      const [errors, setErrors] = useState({});
      const [isSubmitted, setIsSubmitted] = useState(false);
      const[touched,setTached]=useState({});
      const handleBlur = async (e) => {
        const { name } = e.target;
        setTached({
          ...touched,
          [name]:true
        })
        try {
          await validationSchema.validateAt(name, { [name]: department[name] });
          setErrors((prev) => ({ ...prev, [name]: undefined }));
        } catch (err) {
          setErrors((prev) => ({ ...prev, [name]: err.message }));
        }
      };
      const handleSubmit= async (e) => {
        e.preventDefault();
        const values = { ...department};
        try {
          await validationSchema.validate(values, { abortEarly: false });
          setErrors({});
          setIsSubmitted(true);
        } catch (err) {
          const validationErrors = {};
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          setErrors(validationErrors);
          setIsSubmitted(false);
        }
      };
      useEffect(() => {
        if (isSubmitted === true) {
          route("/");
        }
      }, [isSubmitted, route]);
  return (
    <Box
    component="form"
    onSubmit={handleSubmit}
      sx={{
        margin:'100px auto',
        p:2,
        display: "flex",
        flexDirection: "column",
        alignItems:'center',
        justifyContent:'center',
        gap:3,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.9)",
        border:'1px solid #00ACB1',
        height:'400px',
        maxWidth:'500px'
      }}
    >
        <Typography variant="h5" component="h2" sx={{color:'#00ACB1',textDecoration:'underline'}}>
            Add New DePartment
        </Typography>
         <TextField
         fullWidth
          required
          id="outlined-required"
          placeholder="Department Name"
          name="name"
          value={department.name}
          onChange={handleChange}
          error={touched.name&&Boolean(errors.name)}
          helperText={touched.name&&errors.name}
          onBlur={handleBlur}
        />
        
        <TextField
        fullWidth
        required
          id="outlined-select-currency"
          select
          label="please select your Head Of Department"
        >
          {department.headDepartment.map((option,index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{display:'flex',gap:2}}>
        <Button
        variant="contained"
        type="submit"
        sx={{ background: '#00ACB1',p:1,fontWeight:'bold' }}
      >
        Submit
      </Button>
      <Button
        variant="outlined"
        sx={{ color: '#00ACB1',p:1,fontWeight:'bold' }}
        onClick={()=>{route('/department')}}
      >
        Back
      </Button>
        </Box>
    </Box>
  );
}
