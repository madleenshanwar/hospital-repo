import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AddDepartments } from "../../Api/Department/AddDepartments";
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Department name is required")
    .min(3, "Name must have at least 3 letters")
    .max(25, "must contain at least 25 letters"),
});
export default function AddDepartmentCard() {
  const [department, setDepartment] = useState({
    name: "",
  });
  const route = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setDepartment((prevD) => ({
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
    const values = { ...department };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("Department Info:", values);
      setErrors({});
      const result = await AddDepartments(department);
      if (result) {
        setIsSubmitted(true);
        console.log("Department added successfully!");
      } else {
        console.log("Failed to add department.");
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
      route("/department");
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
        Add New DePartment
      </Typography>
      <TextField
        placeholder="Department Name"
        name="name"
        fullWidth
        variant="outlined"
        value={department.name}
        onChange={handleChange}
        error={Boolean(errors.name)}
        helperText={errors.name}
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
            route("/department");
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
