import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ForgetPassApi } from "../../Api/Auth/ForgetPassApi";
import EmailIcon from "@mui/icons-material/Email";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});
export default function ForgetPassCard() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const route = useNavigate();
  const handleChange = async (e) => {
    const { value } = e.target;
    setEmail(value); 
    try {
      await validationSchema.validateAt("email", { email: value });
      setErrors((prev) => ({ ...prev, email: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, email: error.message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate({email}, { abortEarly: false });
      console.log("Form Submitted:", email);
      setErrors({});
      const result = await ForgetPassApi(email);
      if (result) {
        setIsSubmitted(true);
        console.log("Your email checked!");
      } else {
        console.log("Failed to check email.");
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
    if (isSubmitted) {
        route("/resetpass");
    }
  }, [isSubmitted, route]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="at-item"
      sx={{
        margin: "60px auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.8)",
        border: "1px solid #00ACB1",
        height: "300px",
        maxWidth: "600px",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ color: "#00ACB1", textDecoration: "underline" }}
      >
        Please Check Your Email
      </Typography>
      <TextField
        sx={{ maxWidth: "400px" }}
        placeholder="Enter Your Email"
        name="email"
        fullWidth
        variant="outlined"
        value={email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <EmailIcon sx={{ color: "#07E4DB" }} />
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ background: "#00ACB1", p: 1, fontWeight: "bold", width: "100px" }}
      >
        Submit
      </Button>
    </Box>
  );
}
