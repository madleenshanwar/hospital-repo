import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { ShowDoctors } from "../../../Api/Doctors/ShowDoctors";
import { FetchPatients } from "../../../Api/Patient/FetchPatients";
import * as Yup from "yup";
import { FetchRays } from "../../../Api/services/rays/FetchRays";
import { AddPatientRay } from "../../../Api/ProvideService/Ray/AddPatientRay";
const validationSchema = Yup.object().shape({
  patient_id: Yup.number().required("patient is required"),
  doctor_id: Yup.number().required("doctor is required"),
  ray_id: Yup.number().required("ray is required"),
  date: Yup.string().required("date is required"),
});
export default function ProvideRayCard() {
  const [patientRay, setPatientRay] = useState({
    patient_id: "",
    doctor_id: "",
    ray_id: "",
    date: "",
  });
  const [ray, setRay] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patient, setPatient] = useState([]);
  useEffect(() => {
    const fetchRays = async () => {
      try {
        const result = await FetchRays();
        console.log(result.data.data.data);
        setRay(result.data.data.data);
      } catch (error) {
        console.error("Error fetching rays:", error);
      }
    };
    const fetchDoctors = async () => {
      try {
        const result = await ShowDoctors();
        setDoctors(result.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    const fetchPatients = async () => {
      try {
        const result = await FetchPatients();
        console.log(result.data.data.data);
        setPatient(result.data.data.data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };
    fetchPatients();
    fetchDoctors();
    fetchRays();
  }, []);
  const route = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setPatientRay((prevD) => ({
      ...prevD,
      [name]: value,
    }));
    console.log(patientRay);
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { ...patientRay };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("patientRay Info:", values);
      setErrors({});
      const result = await AddPatientRay(patientRay);
      if (result) {
        setIsSubmitted(true);
        console.log("patientRay added successfully!");
      } else {
        console.log("Failed to add patientRay.");
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
      route("/provideservice");
    }
  }, [isSubmitted, route]);
  return (
    <Box
      className="add-item"
      component="form"
      onSubmit={handleSubmit}
      sx={{
        margin: "80px auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.9)",
        border: "1px solid #00ACB1",
        height: "fit-content",
        maxWidth: "500px",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{ color: "#00ACB1", textDecoration: "underline" }}
      >
        Add Patient Ray
      </Typography>
      <TextField
        fullWidth
        id="outlined-select-currency"
        select
        label="please select your Patient"
        value={patientRay.patient_id}
        name="patient_id"
        onChange={handleChange}
        error={Boolean(errors.patient_id)}
        helperText={errors.patient_id}
      >
        <MenuItem disabled value="">
          <em>Please Select Patient</em>
        </MenuItem>
        {patient.length > 0
          ? patient.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.first_name} {option.last_name}
              </MenuItem>
            ))
          : ""}
      </TextField>
      <TextField
        fullWidth
        id="outlined-select-currency"
        select
        label="please select your RayType"
        value={patientRay.ray_id}
        name="ray_id"
        onChange={handleChange}
        error={Boolean(errors.ray_id)}
        helperText={errors.ray_id}
      >
        <MenuItem disabled value="">
          <em>Please Select Ray</em>
        </MenuItem>
        {ray.length > 0
          ? ray.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.type}
              </MenuItem>
            ))
          : ""}
      </TextField>
      <TextField
        fullWidth
        id="outlined-select-currency"
        select
        label="please select your doctor"
        value={patientRay.doctor_id}
        name="doctor_id"
        onChange={handleChange}
        error={Boolean(errors.doctor_id)}
        helperText={errors.doctor_id}
      >
        <MenuItem disabled value="">
          <em>Please Select Doctor</em>
        </MenuItem>
        {doctors.length > 0
          ? doctors.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.first_name} {option.last_name}
              </MenuItem>
            ))
          : ""}
      </TextField>
      <TextField
        label="Please Enter the date of this ray"
        type="date"
        name="date"
        variant="outlined"
        value={patientRay.date}
        onChange={handleChange}
        error={Boolean(errors.date)}
        helperText={errors.date}
        fullWidth
      />
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
            route("/provideservice");
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
