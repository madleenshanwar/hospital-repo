import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoginApi } from "../../Api/Auth/LoginApi";
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
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword =useCallback(() => setShowPassword((show) => !show),[]);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
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
    const values = { ...login };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("Form Submitted:", values);
      setErrors({});
      const result = await LoginApi(login);
      console.log("register", result.data);
      localStorage.setItem("token", result.data.access_token);
      console.log(result.data.access_token);
      if (result) setIsSubmitted(true);
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
      className="at-item"
      sx={{
        margin: "60px auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.8)",
        border: "1px solid #00ACB1",
        height: "400px",
        maxWidth: "600px",
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

      <TextField
        placeholder="Enter Your Password"
        name="password"
        fullWidth
        variant="outlined"
        value={login.password}
        onChange={handleChange}
        error={Boolean(errors.password)}
        helperText={errors.password}
        type={showPassword ? "text" : "password"}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOffIcon sx={{ color: "#07E4DB" }} />
                  ) : (
                    <VisibilityIcon sx={{ color: "#07E4DB" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Typography
        variant="button"
        component="a"
        sx={{ textDecoration: "underline", cursor: "pointer" }}
        onClick={() => route("/forgetpass")}
      >
        Forget Password
      </Typography>
      <Button
        type="submit"
        variant="contained"
        sx={{ background: "#00ACB1", p: 1, fontWeight: "bold", width: "100px" }}
      >
        Login
      </Button>
    </Box>
  );
}
