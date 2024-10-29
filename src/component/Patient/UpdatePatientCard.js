import { useParams } from "react-router-dom";
import { Textarea } from "@mui/joy";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("first_name is required")
    .min(3, "Name must have at least 3 letters")
    .max(10, "must contain at least 10 letters"),
  last_name: Yup.string()
    .required("last_name is required")
    .min(3, "Name must have at least 3 letters")
    .max(10, "must contain at least 10 letters"),
  address: Yup.string().required("address is required"),
  birthday: Yup.string().required("birthday is required"),
  gender: Yup.string().required("gender is required"),
  blood_group: Yup.string().required("  blood_group is required"),
  marital_status: Yup.string().required("marital_status is required"),
  //  allergies:Yup.string()
  //  .required("allergies is required"),
  //  medical_history:Yup.string()
  //  .required("medical_history is required"),
});
export default function UpdatePatientCard() {
  const { index } = useParams();
  const [patient, setPatient] = useState({
    first_name: "",
    last_name: "",
    address: "",
    birthday: "",
    gender: "",
    blood_group: "",
    allergies: "",
    medical_history: "",
    patient_complaint:""
  });
  const route = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setPatient((prevD) => ({
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
    const values = { ...patient };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("Patient Info:", values);
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
      route("/patient");
    }
  }, [isSubmitted, route]);
  return (
    <Box
     className="update-item"
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
        maxWidth: "800px",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{ color: "#00ACB1", textDecoration: "underline" }}
      >
        UPdate Patient
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <TextField
          placeholder="First name"
          name="first_name"
          value={patient.first_name}
          variant="outlined"
          onChange={handleChange}
          error={Boolean(errors.first_name)}
          helperText={errors.first_name}
          sx={{ width: "230px" }}
        />
        <TextField
          placeholder="Last name"
          name="last_name"
          variant="outlined"
          value={patient.last_name}
          onChange={handleChange}
          error={Boolean(errors.last_name)}
          helperText={errors.last_name}
          sx={{ width: "230px" }}
        />
        <TextField
          placeholder="Address"
          name="address"
          variant="outlined"
          value={patient.address}
          onChange={handleChange}
          error={Boolean(errors.address)}
          helperText={errors.address}
          sx={{ width: "230px" }}
        />
        <TextField
          type="date"
          placeholder="Birthday"
          name="birthday"
          variant="outlined"
          value={patient.birthday}
          onChange={handleChange}
          error={Boolean(errors.birthday)}
          helperText={errors.birthday}
          sx={{ width: "230px" }}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="please select your gender"
          onChange={handleChange}
          value={patient.gender}
          name="gender"
          error={Boolean(errors.gender)}
          helperText={errors.gender}
          sx={{ width: "230px" }}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="please select your blood_group"
          onChange={handleChange}
          value={patient.blood_group}
          name="blood_group"
          error={Boolean(errors.blood_group)}
          helperText={errors.blood_group}
          sx={{ width: "230px" }}
        >
          <MenuItem value="A+">A+</MenuItem>
          <MenuItem value="A-">A-</MenuItem>
          <MenuItem value="AB-">AB-</MenuItem>
          <MenuItem value="AB-">AB-</MenuItem>
          <MenuItem value="B-">B-</MenuItem>
          <MenuItem value="B-">B-</MenuItem>
          <MenuItem value="O-">O-</MenuItem>
          <MenuItem value="O-">O-</MenuItem>
        </TextField>
        <Textarea
          size="sm"
          placeholder="add the patient complaint "
          name="patient_complaint"
          variant="outlined"
          value={patient.patient_complaint}
          onChange={handleChange}
          error={Boolean(errors.patient_complaint)}
          helperText={errors.patient_complaint}
          sx={{ width: "230px" }}
        />
        <Textarea
          size="sm"
          placeholder="Do you have any allergies? Please explain this if there is "
          name="allergies"
          variant="outlined"
          value={patient.allergies}
          onChange={handleChange}
          // error={Boolean(errors.allergies)}
          // helperText={errors.allergies}
          sx={{ width: "230px" }}
        />
        <Textarea
          size="sm"
          placeholder="Please tell about your medical_history if there is"
          name="medical_history"
          variant="outlined"
          value={patient.medical_history}
          onChange={handleChange}
          // error={Boolean(errors.medical_history)}
          // helperText={errors.medical_history}
          sx={{ width: "230px" }}
        />
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
            route("/patient");
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
