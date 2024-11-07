import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { FetchLastAdmission } from "../../Api/Patient/FetchLastAdmission";
import { ShowDoctors } from "../../Api/Doctors/ShowDoctors";
import { Dischargepatient } from "../../Api/Patient/Dischargepatient";
const validationSchema = Yup.object().shape({
  discharge_reason: Yup.string().required("discharge reason is required"),
  doctor_id: Yup.string().required("you must select your doctor name"),
});
export default function DischargeCard() {
  const { id } = useParams();
  const [admission, setAdmission] = useState({
    admission_date: "",
    discharge_date: "",
    discharge_reason: "",
    patient_id: "",
    doctor_id: "",
  });
  const[discharge_date,setDischarge_Date]=useState("")
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchAdmission = async () => {
      try {
        const result = await FetchLastAdmission(id);
        console.log("admission", result.data.data);
        setAdmission(result.data.data);
        if(result.data.data.discharge_date)
        setDischarge_Date(result.data.data.discharge_date)
      } catch (error) {
        console.error("Error fetching one admission:", error);
      }
    };
    const fetchDoctors = async () => {
      try {
        const result = await ShowDoctors();
        setDoctors(result.data.data)
        console.log(result.data.data)
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchDoctors();
    fetchAdmission();
  }, [id]);
  const route = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setAdmission((prevD) => ({
      ...prevD,
      patient_id: parseInt(id),
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
  const[pdf_data,setPdf_Data]=useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { ...admission };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("discharge Info:", values);
      setErrors({});
      const result = await Dischargepatient(admission,admission.id);
      if (result) {
        setPdf_Data(result.data)
        setIsSubmitted(true);
        console.log('Discharge patient successfully!');
      } else {
        console.log('Failed to discharge patient.');
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
      // route("/patient");
    }
  }, [isSubmitted, route]);
  //handle with download the result
  const downloadPdf = () => {
    const byteArray = new TextEncoder().encode(pdf_data)
    const blob = new Blob([byteArray],{type:'application/pdf'});

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'downloaded_file.pdf'; 
    link.click();
    URL.revokeObjectURL(link.href); 
  };
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
      {
        !discharge_date? <>
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
         <MenuItem disabled value="">
          <em>Please Select Doctor</em>
        </MenuItem>
        {doctors.length>0?doctors.map((option,index) => (
            <MenuItem key={index} value={option.id} >
              {option.first_name+" "+option.last_name}
            </MenuItem>
          )):''}
      </TextField>
        </>:(  <Typography
        variant="h5"
        component="p"
      >
        This patient has been discharged
      </Typography>)
      }
      <Box sx={{ display: "flex", gap: 2 }}>
        {!isSubmitted&&!discharge_date?( <Button
          variant="contained"
          type="submit"
          sx={{ background: "#00ACB1", p: 1, fontWeight: "bold" }}
        >
          Submit
        </Button>):( <Button
          variant="contained"
          onClick={downloadPdf}
          sx={{ background: "#00ACB1", p: 1, fontWeight: "bold" }}
        >
          Download PDF
        </Button>)}
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
