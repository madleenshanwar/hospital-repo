import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ShowDepartments } from "../../api/Department/Show";
import { FetchTeamDoctors } from "../../Api/Schedules/FetchTeamDoctors";
import { AddScheduleApi } from "../../Api/Schedules/AddScheduleApi";
const validationSchema = Yup.object().shape({
  shift_type: Yup.string().required("shift_type is required"),
  date: Yup.string().required("date is required"),
  start_time: Yup.string().required("start_time is required"),
  end_time: Yup.string().required("end_time is required"),
  doctor_ids: Yup.array()
    .min(1, "you must select at least one option")
    .of(Yup.string().required("option is required")),
  shiftable_id: Yup.string().required("you must select your department"),
});
export default function AddSchedulesCard() {
  const [schedule, setSchedule] = useState({
    shift_type: "",
    date: "",
    start_time: "",
    end_time: "",
    doctor_ids: [],
    shiftable_type: "department",
    shiftable_id: "",
  });
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const result = await ShowDepartments();
        setDepartments(result.data.data);
        console.log(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDepartments();
  }, []);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const result = await FetchTeamDoctors(schedule.shiftable_id);
        console.log(result.data.data);
        setDoctors(result.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, [schedule.shiftable_id]);
  const route = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setSchedule((prevD) => ({
      ...prevD,
      [name]: value,
    }));
    console.log(schedule);
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
      const result = await AddScheduleApi(schedule);
      if (result) {
        setIsSubmitted(true);
        console.log("Shift Schedule added successfully!");
      } else {
        console.log("Failed to add Shift Schedule.");
      }
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
      className="add-item"
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
        maxWidth: "700px",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{ color: "#00ACB1", textDecoration: "underline" }}
      >
        Add Schedule
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          justifyContent: "center",
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
          sx={{ width: "270px" }}
        >
          <MenuItem value="day">Day</MenuItem>
          <MenuItem value="night">Night</MenuItem>
          <MenuItem value="evening">Evining</MenuItem>
        </TextField>
        <TextField
          type="date"
          name="date"
          variant="outlined"
          value={schedule.date}
          onChange={handleChange}
          error={Boolean(errors.date)}
          helperText={errors.date}
          sx={{ width: "270px" }}
        />
        <TextField
          label="Start Time"
          type="time"
          name="start_time"
          variant="outlined"
          value={schedule.start_time}
          onChange={handleChange}
          error={Boolean(errors.start_time)}
          helperText={errors.start_time}
          sx={{ width: "270px" }}
        />
        <TextField
          label="End Time"
          type="time"
          name="end_time"
          variant="outlined"
          value={schedule.end_time}
          onChange={handleChange}
          error={Boolean(errors.end_time)}
          helperText={errors.end_time}
          sx={{ width: "270px" }}
        />
        <FormControl sx={{ width: "270px" }}>
          <InputLabel id="demo-simple-select-label"> doctors team</InputLabel>
          <Select
            id="demo-simple-select-label"
            select
            multiple
            disabled={!schedule.shiftable_id}
            onChange={handleChange}
            value={schedule.doctor_ids}
            name="doctor_ids"
            error={Boolean(errors.doctor_ids)}
            helperText={errors.doctor_ids}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {schedule.shiftable_id
                  ? selected.map((value) => {
                      const doctor = doctors.find((doc) => doc.id === value);
                      return (
                        <Chip
                          key={value}
                          label={
                            doctor
                              ? doctor.first_name + " " + doctor.last_name
                              : ""
                          }
                        />
                      );
                    })
                  : ""}
              </Box>
            )}
          >
            {schedule.shiftable_id
              ? doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.first_name + " " + doctor.last_name}
                  </MenuItem>
                ))
              : ""}
          </Select>
        </FormControl>
        <TextField
          sx={{ width: "270px" }}
          id="outlined-select-currency"
          select
          label="please select your Department"
          value={schedule.shiftable_id}
          name="shiftable_id"
          onChange={handleChange}
          error={Boolean(errors.shiftable_id)}
          helperText={errors.shiftable_id}
        >
          <MenuItem disabled value="">
            <em>Please Select Department</em>
          </MenuItem>
          {departments.length > 0
            ? departments.map((option, index) => (
                <MenuItem key={index} value={option.id}>
                  {option.name}
                </MenuItem>
              ))
            : ""}
        </TextField>
      </Box>
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
  );
}
