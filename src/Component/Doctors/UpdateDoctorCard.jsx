import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { UpdateDoctors } from "../../Api/Doctors/UpdateDoctors";
import { FetchOneDoctor } from "../../Api/Doctors/FetchOneDoctor";
import { ShowDepartments } from "../../api/Department/Show";
const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("first_name is required")
    .min(3, "Name must have at least 3 letters")
    .max(10, "must contain at least 10 letters"),
  last_name: Yup.string()
    .required("last_name is required")
    .min(3, "Name must have at least 3 letters")
    .max(10, "must contain at least 10 letters"),
  speciality: Yup.string().required("speciality is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "phone must be 10 numbers")
    .required("phone is required"),
  license_number: Yup.string().required("license_number is required"),
  city: Yup.string().required("city is required"),
  street: Yup.string().required(" street is required"),
  status: Yup.string().required("You must select an option"),
  department_id: Yup.string().required("You must select an option"),
  department_head: Yup.string().required("You must select an option"),
});
export default function UpdateDoctorCard() {
  const { index } = useParams();
  const [doctor, setDoctor] = useState({
    first_name: "",
    last_name: "",
    speciality: "",
    phone: "",
    license_number: "",
    status: "",
    city: "",
    street: "",
    department_head: "",
    department_id: "",
  });
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const result = await FetchOneDoctor(index);
        console.log("fetch one doctor", result.data.data);
        setDoctor(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctors();
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
  }, [index]);
  const route = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setDoctor((prevD) => ({
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
    const values = { ...doctor };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("Doctor Info:", values);
      setErrors({});
      const result = await UpdateDoctors(doctor, doctor.id);
      if (result) {
        setIsSubmitted(true);
        console.log("Doctor update successfully!");
      } else {
        console.log("Failed to update doctor.");
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
      route("/doctor");
    }
  }, [isSubmitted, route]);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="update-item"
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
        UPdate Doctor
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
          value={doctor.first_name}
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
          value={doctor.last_name}
          onChange={handleChange}
          error={Boolean(errors.last_name)}
          helperText={errors.last_name}
          sx={{ width: "230px" }}
        />
        <TextField
          placeholder="Enter Your speciality"
          name="speciality"
          value={doctor.speciality}
          variant="outlined"
          onChange={handleChange}
          error={Boolean(errors.speciality)}
          helperText={errors.speciality}
          sx={{ width: "230px" }}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="please select your city"
          onChange={handleChange}
          value={doctor.city}
          name="city"
          error={Boolean(errors.city)}
          helperText={errors.city}
          sx={{ width: "230px" }}
        >
          <MenuItem value="homs">Homs</MenuItem>
          <MenuItem value="damascus">Damascus</MenuItem>
          <MenuItem value="aleppo">Aleppo</MenuItem>
          <MenuItem value="daraa">Daraa</MenuItem>
          <MenuItem value="idlib">Idlib</MenuItem>
          <MenuItem value="deir-ez-Zor">Deir ez-Zor</MenuItem>
          <MenuItem value="hama">Hama</MenuItem>
          <MenuItem value="latakia">Latakia</MenuItem>
          <MenuItem value="al-hasakah">Al-Hasakah</MenuItem>
          <MenuItem value="al-raqa">Al-Raqa</MenuItem>
          <MenuItem value="al_swieda">Al-Swieda</MenuItem>
          <MenuItem value="al_qunaitra">Al-Qunaitra</MenuItem>
          <MenuItem value="rual_damascus">Rual Damascus</MenuItem>
        </TextField>
        <TextField
          placeholder="Enter Your Street"
          name="street"
          variant="outlined"
          value={doctor.street}
          onChange={handleChange}
          error={Boolean(errors.street)}
          helperText={errors.street}
          sx={{ width: "230px" }}
        />
        <TextField
          placeholder="Enter Your Phone Number"
          name="phone"
          value={doctor.phone}
          variant="outlined"
          onChange={handleChange}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          sx={{ width: "230px" }}
        />
        <TextField
          placeholder="Enter Your license_number"
          name="license_number"
          value={doctor.license_number}
          variant="outlined"
          onChange={handleChange}
          error={Boolean(errors.license_number)}
          helperText={errors.license_number}
          sx={{ width: "230px" }}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Please select status"
          onChange={handleChange}
          value={doctor.status}
          name="status"
          error={Boolean(errors.status)}
          helperText={errors.status}
          sx={{ width: "230px" }}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="leave">Leave</MenuItem>
          <MenuItem value="resigned">Resigned</MenuItem>
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Are You a department head??"
          onChange={handleChange}
          value={doctor.department_head}
          name="department_head"
          error={Boolean(errors.department_head)}
          helperText={errors.department_head}
          sx={{ width: "230px" }}
        >
          <MenuItem value="1">Yes</MenuItem>
          <MenuItem value="0">No</MenuItem>
        </TextField>
        <TextField
          sx={{ width: "740px" }}
          id="outlined-select-currency"
          select
          label="please select your Department"
          value={doctor.department_id || ""}
          name="department_id"
          onChange={handleChange}
          error={Boolean(errors.department_id)}
          helperText={errors.department_id}
        >
          <MenuItem disabled value="">
            <em>Please Select Department</em>
          </MenuItem>
          {departments.length > 0 ? (
            departments.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No departments available</MenuItem>
          )}
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
            route("/doctor");
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
