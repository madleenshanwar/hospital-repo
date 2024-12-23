import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import { Register } from "../../Api/Auth/Register";
const validationSchema = Yup.object().shape({
  full_name: Yup.string()
    .required("full_name is required")
    .min(3, "Name must have at least 3 letters")
    .max(25, "Name must have at most 30 letters"),
  email: Yup.string().email("email is invalid").required("email is required"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "phone must be 10 numbers")
    .required("phone is required"),
  address: Yup.string().required("address is required"),
  role: Yup.string().required("role is required"),
  user_name: Yup.string().required("user_name is required"),
});
export default function SignUpCard() {
  const [signUp, setSignUp] = useState({
    full_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    address: "",
    role: "",
    user_name: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const route = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => useCallback(setShowPassword((show) => !show),[]);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setSignUp((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(signUp);
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { ...signUp };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("Form Submitted:", values);
      setErrors({});
      const result = await Register(signUp);
      if (result) {
        setIsSubmitted(true);
        console.log("Register successfully!");
      } else {
        console.log("Failed to register.");
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
      route("/");
    }
  }, [isSubmitted, route]);
  return (
    <Box
      className="at-item"
      component="form"
      onSubmit={handleSubmit}
      sx={{
        margin: "60px auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.8)",
        border: "1px solid #00ACB1",
        height: "fit-content",
        maxWidth: "600px",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ color: "#00ACB1", textDecoration: "underline" }}
      >
        SIGN UP
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <TextField
          placeholder="Enter Your Full_Name"
          name="full_name"
          variant="outlined"
          value={signUp.full_name}
          onChange={handleChange}
          error={Boolean(errors.full_name)}
          helperText={errors.full_name}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <PersonIcon sx={{ color: "#07E4DB" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ maxWidth: "250px" }}
        />
        <TextField
          placeholder="Enter Your Email"
          name="email"
          fullWidth
          variant="outlined"
          value={signUp.email}
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
          sx={{ maxWidth: "250px" }}
        />
        <TextField
          placeholder="Enter Your Password"
          name="password"
          variant="outlined"
          value={signUp.password}
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
          sx={{ maxWidth: "250px" }}
        />
        <TextField
          placeholder="Confirm Your Password"
          name="password_confirmation"
          variant="outlined"
          value={signUp.password_confirmation}
          onChange={handleChange}
          error={Boolean(errors.password_confirmation)}
          helperText={errors.password_confirmation}
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
          sx={{ maxWidth: "250px" }}
        />
        <TextField
          placeholder="Enter Your phone"
          name="phone"
          variant="outlined"
          value={signUp.phone}
          onChange={handleChange}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <LocalPhoneIcon sx={{ color: "#07E4DB" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ maxWidth: "250px" }}
        />
        <TextField
          placeholder="Enter Your Address"
          name="address"
          fullWidth
          variant="outlined"
          value={signUp.address}
          onChange={handleChange}
          error={Boolean(errors.address)}
          helperText={errors.address}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <HomeIcon sx={{ color: "#07E4DB" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ maxWidth: "250px" }}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="please select employee role"
          onChange={handleChange}
          value={signUp.role}
          name="role"
          error={Boolean(errors.role)}
          helperText={errors.role}
          sx={{ width: "250px" }}
        >
          <MenuItem value="superAdmin">Super Admin</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="admissionStaff">Admissin Staff</MenuItem>
          <MenuItem value="ambulanceStaff">Ambulance Staff</MenuItem>
          <MenuItem value="hrStaff">HR Staff</MenuItem>
        </TextField>
        <TextField
          placeholder="Enter Your User Name"
          name="user_name"
          variant="outlined"
          value={signUp.user_name}
          onChange={handleChange}
          error={Boolean(errors.user_name)}
          helperText={errors.user_name}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <PersonIcon sx={{ color: "#07E4DB" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ maxWidth: "250px" }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            background: "#00ACB1",
            p: 1,
            fontWeight: "bold",
            width: "100px",
          }}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "#00ACB1", p: 1, fontWeight: "bold", width: "100px" }}
          onClick={() => route("/department")}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
