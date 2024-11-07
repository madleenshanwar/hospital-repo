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
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { AddSurgeryApi } from "../../Api/Surgery/AddSurgeryApi";
import { ShowDoctors } from "../../Api/Doctors/ShowDoctors";
import { FetchPatients } from "../../Api/Patient/FetchPatients";
import { ShowDepartments } from "../../api/Department/Show";
import { AvailableRoom } from "../../Api/Room/AvailableRoom";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  date: Yup.string().required("date is required"),
  hour: Yup.string().required("time is required"),
  anesthesia_type: Yup.string().required("anesthesia_type is required"),
  room_id: Yup.string().required("you must select the number of room"),
  patient_id: Yup.string().required("you must select the patien"),
  surgery_doctor: Yup.array()
    .min(1, "you must select at least one option")
    .of(Yup.string().required("option is required")),
});
export default function AddSurgeryCard() {
  const [surgery, setSurgery] = useState({
    name: "",
    date: "",
    hour: "",
    patient_id: "",
    anesthesia_type: "",
    room_id: "",
    surgery_doctor: [],
  });
  const [doctors, setDoctors] = useState([]);
  const [patient, setPatient] = useState([]);
  const [room, setRoom] = useState([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const result = await ShowDepartments();
        console.log(
          "department",
          result.data.data.find((el) => el.name === "surgery department")?.id
        );
        try {
          const response = await AvailableRoom(
            parseInt(
              result.data.data.find((el) => el.name === "surgery department")
                ?.id
            )
          );
          console.log("Room", response.data.data.rooms);
          setRoom(response.data.data.rooms);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDepartments();
    const fetchDoctors = async () => {
      try {
        const result = await ShowDoctors();
        setDoctors(result.data.data);
        console.log(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPatients = async () => {
      try {
        const result = await FetchPatients();
        console.log("patient", result.data.data.data);
        setPatient(result.data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPatients();
    fetchDoctors();
  }, []);
  const route = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setSurgery((prevD) => ({
      ...prevD,
      [name]: value,
    }));
    console.log(surgery);
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { ...surgery };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("surgery Info:", values);
      setErrors({});
      const result = await AddSurgeryApi(surgery);
      if (result) {
        setIsSubmitted(true);
        console.log("Surgery added successfully!");
      } else {
        console.log("Failed to add surgery.");
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
      route("/surgery");
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
        Add SurGical oPeration
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <TextField
          placeholder="name of surgery"
          type="text"
          name="name"
          variant="outlined"
          value={surgery.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
          sx={{ width: "300px" }}
        />
        <TextField
          label="Date Of Surgery"
          type="date"
          name="date"
          variant="outlined"
          value={surgery.date}
          onChange={handleChange}
          error={Boolean(errors.date)}
          helperText={errors.date}
          sx={{ width: "300px" }}
        />
        <TextField
          placeholder="Start hour"
          type="time"
          name="hour"
          variant="outlined"
          value={surgery.hour}
          onChange={handleChange}
          error={Boolean(errors.hour)}
          helperText={errors.hour}
          sx={{ width: "300px" }}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="please select your anesthesia_type"
          onChange={handleChange}
          value={surgery.anesthesia_type}
          name="anesthesia_type"
          error={Boolean(errors.anesthesia_type)}
          helperText={errors.anesthesia_type}
          sx={{ width: "300px" }}
        >
          <MenuItem value="general anesthesia">general anesthesia</MenuItem>
          <MenuItem value="local anesthesia">local anesthesia</MenuItem>
          <MenuItem value="regional anesthesia">regional anesthesia</MenuItem>
          <MenuItem value="spinal anesthesia">spinal anesthesia</MenuItem>
          <MenuItem value="epidural anesthesia">epidural anesthesia</MenuItem>
          <MenuItem value="intravenous anesthesia">
            intravenous anesthesia
          </MenuItem>
          <MenuItem value="continuous anesthesia">
            continuous anesthesia
          </MenuItem>
          <MenuItem value="sedation anesthesia">sedation anesthesia</MenuItem>
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="please select your room_id"
          onChange={handleChange}
          value={surgery.room_id}
          name="room_id"
          error={Boolean(errors.room_id)}
          helperText={errors.room_id}
          sx={{ width: "300px" }}
        >
          {room.length > 0
            ? room.map((el) => (
                <MenuItem key={el} value={el.id}>
                  {el.number}
                </MenuItem>
              ))
            : ""}
        </TextField>
        <FormControl sx={{ width: "300px" }}>
          <InputLabel id="demo-simple-select-label"> doctors team</InputLabel>
          <Select
            id="demo-simple-select-label"
            select
            multiple
            onChange={handleChange}
            value={surgery.surgery_doctor}
            name="surgery_doctor"
            error={Boolean(errors.surgery_doctor)}
            helperText={errors.surgery_doctor}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  const doctor = doctors.find((doc) => doc.id === value);
                  return (
                    <Chip
                      key={value}
                      label={
                        doctor ? doctor.first_name + " " + doctor.last_name : ""
                      }
                    />
                  );
                })}
              </Box>
            )}
          >
            {doctors.map((doctor) => (
              <MenuItem key={doctor.id} value={doctor.id}>
                {doctor.first_name + " " + doctor.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TextField
        id="outlined-select-currency"
        select
        label="please select your patient"
        onChange={handleChange}
        value={surgery.patient_id}
        name="patient_id"
        error={Boolean(errors.patient_id)}
        helperText={errors.patient_id}
        sx={{ width: "620px" }}
      >
        {patient.length > 0
          ? patient.map((el) => (
              <MenuItem key={el.id} value={el.id}>
                {el.first_name + " " + el.last_name}
              </MenuItem>
            ))
          : ""}
      </TextField>
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
            route("/surgery");
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
