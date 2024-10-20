import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  shift_type: Yup.string()
    .required("shift_type is required"),
    start_time: Yup.string()
    .required("shift_type is required"),
    end_time: Yup.string()
    .required("shift_type is required"),
    doctor_id:Yup.string()
    .required("you must select un option")
});
export default function AddSchedulesCard() {
  const [schedule,setSchedule]=useState({
    shift_type:'',
    start_time:"",
    end_time:"",
    doctor_id:[]
  })
  const Doctors=[{id:'1',name:'george'},{id:'2',name:'saad'}]
  const route = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setSchedule((prevD) => ({
      ...prevD,
      [name]: value,
    }));
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { ...schedule };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("schedule Info:", values);
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
      route("/schedules");
    }
  }, [isSubmitted, route]);
  return (
    <Box
    component="form"
    onSubmit={handleSubmit}
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
      maxWidth: "500px",
    }}
  >
     <TextField
          id="outlined-select-currency"
          select
          label="please select your shift_type"
          onChange={handleChange}
          value={schedule.shift_type}
          name="shift_type"
          error={Boolean(errors.shift_type)}
          helperText={errors.shift_type}
          fullWidth
        >
          <MenuItem value="day">Day</MenuItem>
          <MenuItem value="night">Night</MenuItem>
          <MenuItem value="evening">Evining</MenuItem>
        </TextField>
        <TextField
          placeholder="Start Time"
          type='time'
          name="start_time"
          variant="outlined"
          value={schedule.start_time}
          onChange={handleChange}
          error={Boolean(errors.start_time)}
          helperText={errors.start_time}
          fullWidth
        />
        <TextField
          placeholder="End Time"
          type='time'
          name="end_time"
          variant="outlined"
          value={schedule.end_time}
          onChange={handleChange}
          error={Boolean(errors.end_time)}
          helperText={errors.end_time}
          fullWidth
        />
        <Select
          id="outlined-select-currency"
          select
          multiple
          label="please select your shift_type"
          onChange={handleChange}
          value={schedule.doctor_id}
          name="doctor_id"
          error={Boolean(errors.doctor_id)}
          helperText={errors.doctor_id}
          fullWidth
        >
          {Doctors.map(doctor=><MenuItem value={doctor.id}>{doctor.name}</MenuItem>)}
        </Select>
        <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          type="submit"
          sx={{
            background: "#00ACB1",
            p: 1,
            fontWeight: "bold",
            width: "150px",
          }}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "#00ACB1", p: 1, fontWeight: "bold", width: "150px" }}
          onClick={() => {
            route("/schedules");
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  )
}
