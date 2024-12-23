import React, { useEffect, useState } from "react";
import { FetchTest } from "../../../Api/services/Test/FetchTest";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { ShowDoctors } from "../../../Api/Doctors/ShowDoctors";
import { FetchPatients } from "../../../Api/Patient/FetchPatients";
import * as Yup from "yup";
import { UpdatePatientTest } from "../../../Api/ProvideService/Test/UpdatePatientTest";
import { FetchOnePatientTest } from "../../../Api/ProvideService/Test/FetchOnePatientTest";
import { FetchLastAdmission } from "../../../Api/Patient/FetchLastAdmission";
const validationSchema = Yup.object().shape({
  patient_id: Yup.number().required("patient is required"),
  doctor_id: Yup.number().required("doctor is required"),
  test_id: Yup.number().required("test is required"),
  date: Yup.string().required("date is required"),
  result: Yup.string().required("result is required"),
  description: Yup.string().required("description is required"),
});
export default function UpdatePatientTestCard() {
  const { id } = useParams();
  const [patientTest, setPatientTest] = useState({
    id: "",
    admission_id: "",
    patient_id: "",
    doctor_id: "",
    test_id: "",
    date: "",
    result: "",
    description: "",
  });
  const [test, setTest] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patient, setPatient] = useState([]);
  const[addmisionId,setAdmissionId]=useState(0)
  useEffect(() => {
    const fetchPatientTest = async () => {
      try {
        const result = await FetchOnePatientTest(id);
        console.log("patienttest", result.data.data);
        setPatientTest(result.data.data);
        try {
          const response = await FetchLastAdmission(parseInt(result.data.data.patient_id));
          console.log("admission", response.data.data.id);
          setAdmissionId(response.data.data.id);
        } catch (error) {
          console.error("Error fetching last patient admission:", error);
        }
      } catch (error) {
        console.error("Error fetching patient tests:", error);
      }
    };
    const fetchTests = async () => {
      try {
        const result = await FetchTest();
        console.log("test", result.data.data.data);
        setTest(result.data.data.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
    const fetchDoctors = async () => {
      try {
        const result = await ShowDoctors();
        console.log("doctors", result.data.data);
        setDoctors(result.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    const fetchPatients = async () => {
      try {
        const result = await FetchPatients();
        console.log("patient", result.data.data.data);
        setPatient(result.data.data.data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };
    fetchPatientTest();
    fetchPatients();
    fetchDoctors();
    fetchTests();
  }, []);
  const route = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setPatientTest((prevD) => ({
      ...prevD,
      admission_id:parseInt(addmisionId),
      [name]: value,
    }));
    console.log(patientTest);
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { ...patientTest };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("patientTest Info:", values);
      setErrors({});
      const result = await UpdatePatientTest(patientTest, patientTest.id);
      if (result) {
        setIsSubmitted(true);
        console.log("patientTest updated successfully!");
      } else {
        console.log("Failed to update patientTest.");
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
        UPdate Patient Test
      </Typography>
      <TextField
        fullWidth
        id="outlined-select-currency"
        select
        label="please select your Patient"
        value={patientTest.patient_id || ""}
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
          :(<MenuItem disabled>No patient available</MenuItem>)}
      </TextField>
      <TextField
        fullWidth
        id="outlined-select-currency"
        select
        label="please select your TestType"
        value={patientTest.test_id || ""}
        name="test_id"
        onChange={handleChange}
        error={Boolean(errors.test_id)}
        helperText={errors.test_id}
      >
        <MenuItem disabled value="">
          <em>Please Select Test</em>
        </MenuItem>
        {test.length > 0
          ? test.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.type}
              </MenuItem>
            ))
          : (<MenuItem disabled>No test available</MenuItem>)}
      </TextField>
      <TextField
        fullWidth
        id="outlined-select-currency"
        select
        label="please select your doctor"
        value={patientTest.doctor_id || ""}
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
          : (<MenuItem disabled>No doctors available</MenuItem>)}
      </TextField>
      <TextField
        label="Please Enter the date of this test"
        type="date"
        name="date"
        variant="outlined"
        value={patientTest.date}
        onChange={handleChange}
        error={Boolean(errors.date)}
        helperText={errors.date}
        fullWidth
      />
      <TextField
        size="sm"
        placeholder="Please Enter The Result"
        name="result"
        variant="outlined"
        value={patientTest.result}
        onChange={handleChange}
        error={Boolean(errors.result)}
        helperText={errors.result}
        sx={{ width: "300px" }}
        rows={4}
        multiline
      />
      <TextField
        size="sm"
        placeholder="Please Enter Any Notes You Won't To Add"
        name="description"
        variant="outlined"
        value={patientTest.description}
        onChange={handleChange}
        error={Boolean(errors.description)}
        helperText={errors.description}
        sx={{ width: "300px" }}
        rows={4}
        multiline
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
