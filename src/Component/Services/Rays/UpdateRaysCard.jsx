import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { FetchOneRay } from "../../../Api/services/rays/FetchOneRay";
import { UpdateRayApi } from "../../../Api/services/rays/UpdateRayApi";
const validationSchema = Yup.object().shape({
  type: Yup.string().required("type is required"),
  name: Yup.string().required("name is required"),
  amount: Yup.number()
    .required("amount is required")
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1 ls"),
});
export default function UpdateRaysCard() {
  const { index } = useParams();
  const [rays, setRays] = useState({
    type: "",
    name: "",
    amount: "",
  });
  const route = useNavigate();
  useEffect(() => {
    const fetchRay = async () => {
      try {
        const result = await FetchOneRay(index);
        setRays(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRay();
  }, [index]);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setRays((prevD) => ({
      ...prevD,
      [name]: value,
    }));
    console.log(rays);
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { ...rays };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("Ray Info:", values);
      setErrors({});
      const result = await UpdateRayApi(rays, rays.id);
      if (result) {
        setIsSubmitted(true);
        console.log("Ray update successfully!");
      } else {
        console.log("Failed to update ray.");
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
      route("/services");
    }
  }, [isSubmitted, route]);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="update-item"
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
        UPdate Rays
      </Typography>
      <TextField
        label="name of Radiography"
        type="text"
        name="name"
        variant="outlined"
        value={rays.name}
        onChange={handleChange}
        error={Boolean(errors.name)}
        helperText={errors.name}
        fullWidth
      />
      <TextField
        label="type of Radiography"
        type="text"
        name="type"
        variant="outlined"
        value={rays.type}
        onChange={handleChange}
        error={Boolean(errors.type)}
        helperText={errors.type}
        fullWidth
      />
      <TextField
        label="price of Radiography"
        name="amount"
        variant="outlined"
        value={rays.amount}
        onChange={handleChange}
        error={Boolean(errors.amount)}
        helperText={errors.amount}
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
            route("/services");
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
