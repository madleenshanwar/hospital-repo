import React, { useEffect, useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters")
    .required("Password is required"),
});

export default function LoginCard() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const route = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
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
    const values = { ...login};
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("Form Submitted:", values);
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
    if (isSubmitted) {
      route("/department");
    }
  }, [isSubmitted, route]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        margin: "100px auto",
        p: 2,
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
        maxWidth: "500px",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ color: "#00ACB1", textDecoration: "underline" }}
      >
        LOGIN
      </Typography>

      <TextField
        placeholder="Enter Your Email"
        name="email"
        fullWidth
        variant="outlined"
        value={login.email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />

      <TextField
        placeholder="Enter Your Password"
        name="password"
        type="password"
        fullWidth
        variant="outlined"
        value={login.password}
        onChange={handleChange}
        error={Boolean(errors.password)}
        helperText={errors.password}
      />
      <Box sx={{display:'flex',gap:2}}>
      <Button
        type="submit"
        variant="contained"
        sx={{ background: "#00ACB1", p: 1, fontWeight: "bold" }}
      >
        Submit
      </Button>
      <Button
        variant="outlined"
        sx={{ color: "#00ACB1", p: 1, fontWeight: "bold" }}
      >
        Sign Up
      </Button>
      </Box>
    </Box>
  );
}