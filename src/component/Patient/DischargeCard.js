import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  discharge_reason: Yup.string().required("discharge reason is required"),
  doctor_id: Yup.string().required("you must select your doctor name"),
});
export default function DischargeCard() {
    const {id}=useParams()
  const [admission, setAdmission] = useState({
    admission_date: "",
    discharge_date: "",
    discharge_reason: "",
    patient_id: "",
    doctor_id: "",
  });
  const route = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setAdmission((prevD) => ({
      ...prevD,
      patient_id:parseInt(id),
      [name]: value,
    }));
    console.log(admission);
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { ...admission };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("Room Info:", values);
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
      className="add-item"
      component="form"
      onSubmit={handleSubmit}
      sx={{
        margin: "70px auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.9)",
        border: "1px solid #00ACB1",
        height: "fit-content",
        maxWidth: "550px",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{ color: "#00ACB1", textDecoration: "underline" }}
      >
        Handle With DischarGe
      </Typography>
       <TextField
        placeholder="Discharge Reason"
        type="text"
        name="discharge_reason"
        fullWidth
        variant="outlined"
        value={admission.discharge_reason}
        onChange={handleChange}
        error={Boolean(errors.discharge_reason)}
        helperText={errors.discharge_reason}
      />
      <TextField
          id="outlined-select-currency"
          select
          label="please select Doctor"
          onChange={handleChange}
          value={admission.doctor_id}
          name="doctor_id"
          error={Boolean(errors.doctor_id)}
          helperText={errors.doctor_id}
          fullWidth
        >
          {/* <MenuItem value={doctor.id}>{doctor.name}</MenuItem> */}
        </TextField>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          type="submit"
          sx={{ background: "#00ACB1", p: 1, fontWeight: "bold" }}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "#00ACB1", p: 1, fontWeight: "bold" }}
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
