import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { AdmissionPatientApi } from "../../Api/Patient/AdmissionPatientApi";
const validationSchema = Yup.object().shape({
  patient_complaint: Yup.string().required("patient_complaint is required"),
});
export default function AdmissionCard() {
  const { index } = useParams();
  const [admission, setAdmission] = useState({
    patient_id: parseInt(index),
    patient_complaint: "",
  });
  const route = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setAdmission((prevD) => ({
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
    const values = { ...admission };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("Admission Info:", values);
      setErrors({});
      const result = await AdmissionPatientApi(admission);
      if (result) {
        setIsSubmitted(true);
        console.log("Admission successfully!");
      } else {
        console.log("Failed to admission.");
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
        justifyContent: "center",
        gap: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.9)",
        border: "1px solid #00ACB1",
        height: "400px",
        maxWidth: "550px",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{ color: "#00ACB1", textDecoration: "underline" }}
      >
        Admission Patient
      </Typography>
      <TextField
        placeholder="Patient Complaint"
        name="patient_complaint"
        fullWidth
        variant="outlined"
        value={admission.patient_complaint}
        onChange={handleChange}
        error={Boolean(errors.patient_complaint)}
        helperText={errors.patient_complaint}
        multiline
        rows={4}
      />
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
