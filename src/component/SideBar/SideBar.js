import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
function SideBar(props) {
  const [auth, setAuth] = React.useState(true);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { window } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const route = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ background: "#015D67" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
            className="logo"
          >
            Hospital Management
          </Typography>
          <Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <Avatar alt="Remy Sharp" sx={{ border: "3px solid #D5E4E6" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>LogOut</MenuItem>
            </Menu>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={{ background: "#E5EEEF" }}>
          {/* sign up */}
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => route("/register")}>
                <ListItemIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#015D67" d="M15 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 1.9a2.1 2.1 0 1 1 0 4.2A2.1 2.1 0 0 1 12.9 8A2.1 2.1 0 0 1 15 5.9M4 7v3H1v2h3v3h2v-3h3v-2H6V7zm11 6c-2.67 0-8 1.33-8 4v3h16v-3c0-2.67-5.33-4-8-4m0 1.9c2.97 0 6.1 1.46 6.1 2.1v1.1H8.9V17c0-.64 3.1-2.1 6.1-2.1"/></svg>
                </ListItemIcon>
                <ListItemText>
                  <p className="font-bold">Register</p>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          {/* Department section*/}
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => route("/department")}>
                <ListItemIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="32"
                    viewBox="0 0 640 512"
                  >
                    <path
                      fill="#015D67"
                      d="M232 0c-39.8 0-72 32.2-72 72v8H72c-39.8 0-72 32.2-72 72v288c0 39.8 32.2 72 72 72h486.4c39.8 0 72-32.2 72-72V152c0-39.8-32.2-72-72-72h-88v-8c0-39.8-32.2-72-72-72zm248 128h88c13.3 0 24 10.7 24 24v40h-56c-13.3 0-24 10.7-24 24s10.7 24 24 24h56v48h-56c-13.3 0-24 10.7-24 24s10.7 24 24 24h56v104c0 13.3-10.7 24-24 24h-88zm-408 0h88v336H77.5c-13.2 0-24-10.7-24-24V336h56c13.3 0 24-10.7 24-24s-10.7-24-24-24h-56v-48h56c13.3 0 24-10.7 24-24s-10.7-24-24-24h-56v-40c0-13.3 10.7-24 24-24zm136-56c0-13.3 10.7-24 24-24h176c13.3 0 24 10.7 24 24v392h-64v-64c0-26.5-21.5-48-48-48s-48 21.5-48 48v64h-64zm88 24v24h-24c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h24v24c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16v-24h24c8.8 0 16-7.2 16-16v-16c0-8.8-7.2-16-16-16h-24V96c0-8.8-7.2-16-16-16h-16c-8.8 0-16 7.2-16 16"
                    />
                  </svg>
                </ListItemIcon>
                <ListItemText>
                  <p className="font-bold">Department</p>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          {/* Room section */}
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => route("/room")}>
                <ListItemIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#015D67"
                      fill-rule="evenodd"
                      d="M32 9a1 1 0 0 1-1-1V6h-2v2c0 1.306.835 2.418 2 2.83V12h-1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-1v-1h5v12.066H20.11a.3.3 0 0 1-.218-.09l-.366-.37l.369-.367a3.77 3.77 0 0 0 .001-5.333l-1.8-1.8a3.77 3.77 0 0 0-5.333-.003l-.704.704a3.95 3.95 0 0 0-3.892 1.021a4.034 4.034 0 0 0 0 5.676l.833.839V34H6v2h3.05a3.5 3.5 0 1 0 4.899 0h20.102a3.5 3.5 0 1 0 4.899 0H42v-2h-4v-3h.066C40.24 31 42 29.224 42 27.033a3.97 3.97 0 0 0-2-3.455V11a2 2 0 0 0-2-2zm-18.174 7.868l4.29 4.32l.365-.364a1.77 1.77 0 0 0 0-2.504l-1.8-1.8a1.77 1.77 0 0 0-2.504-.002zm2.45 13.8c.21.212.497.332.796.332H36v3H11v-8.644zm2.198-6.283c.431.434 1.02.681 1.636.681h17.956c1.052 0 1.934.865 1.934 1.967S39.119 29 38.066 29H17.438l-7.852-7.905a2.034 2.034 0 0 1 0-2.857a1.953 1.953 0 0 1 2.782 0zM13 38.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M36.5 40a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M31 18v-4h2v4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </ListItemIcon>
                <ListItemText>
                  <p className="font-bold">Room</p>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          {/* doctor section */}
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => route("/doctor")}>
                <ListItemIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="#015D67"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      color="#015D67"
                    >
                      <path d="M20 22v-3c0-2.828 0-4.243-.879-5.121C18.243 13 16.828 13 14 13l-2 2l-2-2c-2.828 0-4.243 0-5.121.879C4 14.757 4 16.172 4 19v3m12-9v5.5" />
                      <path d="M8.5 13v4m0 0a2 2 0 0 1 2 2v1m-2-3a2 2 0 0 0-2 2v1m9-13.5v-1a3.5 3.5 0 1 0-7 0v1a3.5 3.5 0 1 0 7 0m1.25 12.75a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0" />
                    </g>
                  </svg>
                </ListItemIcon>
                <ListItemText>
                  <p className="font-bold">Doctor</p>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          {/* Patient section */}
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => route("/patient")}>
                <ListItemIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="#015D67"
                      d="M25 16h-8a2 2 0 0 0-2 2v6H4V14H2v16h2v-4h24v4h2v-9a5.006 5.006 0 0 0-5-5m3 8H17v-6h8a3.003 3.003 0 0 1 3 3Z"
                    />
                    <path
                      fill="#015D67"
                      d="M9.5 17A1.5 1.5 0 1 1 8 18.5A1.5 1.5 0 0 1 9.5 17m0-2a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 9.5 15M21 6h-4V2h-2v4h-4v2h4v4h2V8h4z"
                    />
                  </svg>
                </ListItemIcon>
                <ListItemText>
                  <p className="font-bold">Patient</p>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          {/* Test&Rays */}
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => route("/services")}>
                <ListItemIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><path fill="none" stroke="#015D67" stroke-linecap="round" stroke-linejoin="round" d="M10.99 9.739a1.239 1.239 0 1 1-2.477 0a1.239 1.239 0 0 1 2.478 0m28.496 0a1.239 1.239 0 1 1-2.478 0a1.239 1.239 0 0 1 2.478 0M10.99 38.261a1.239 1.239 0 1 1-2.477 0a1.239 1.239 0 0 1 2.478 0m28.496 0a1.239 1.239 0 1 1-2.478 0a1.239 1.239 0 0 1 2.478 0m-18.89-23.775c-.586-.936-1.275-1.369-3.006-1.369H11.5m25 0h-6.34c-1.732 0-2.421.433-3.007 1.37m.152 5.355s7.367.217 6.29-2.387m-6.571-.379s4.043.119 3.452-1.31m-3.486 6.398s8.918 1.44 7.895-1.893m-8.066 3.955s8.263 4.31 8.319-.202m-8.798 1.914s10.212 9.029 8.347 2.09"/><path fill="none" stroke="#015D67" stroke-linecap="round" stroke-linejoin="round" d="M26.34 25.938s6.135 14.53 7.7 6.553M20.468 19.842s-7.366.217-6.289-2.387m6.571-.379s-4.044.119-3.452-1.31m3.486 6.494s-8.919 1.44-7.896-1.893m8.067 3.859s-8.264 4.31-8.32-.202m8.798 1.914s-10.212 9.029-8.347 2.09"/><path fill="none" stroke="#015D67" stroke-linecap="round" stroke-linejoin="round" d="M21.433 25.938s-6.134 14.53-7.7 6.553m10.247-5.115V15.399"/><rect width="37" height="37" x="5.5" y="5.5" fill="none" stroke="#015D67" stroke-linecap="round" stroke-linejoin="round" rx="4" ry="4"/></svg>
                </ListItemIcon>
                <ListItemText>
                  <p className="font-bold">Services</p>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          {/* schedules for doctor*/}
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => route("/schedules")}>
                <ListItemIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><g fill="#015D67"><path fill-rule="evenodd" d="M10 23a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm4 0v2h-2v-2zm6-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm2 2h-2v2h2zm4 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm2 0h2v2h-2zm-16 6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm0 2v2h2v-2zm6 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm2 0h2v2h-2z" clip-rule="evenodd"/><path d="M35 31.5a1 1 0 0 1 1 1v2.086l.707.707a1 1 0 0 1-1.414 1.414L34 35.414V32.5a1 1 0 0 1 1-1"/><path fill-rule="evenodd" d="M12 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0v-1H9a1 1 0 0 0-1 1v4h26v-4a1 1 0 0 0-1-1h-3V9h3a3 3 0 0 1 3 3v16.07A7.001 7.001 0 0 1 35 42a6.99 6.99 0 0 1-5.745-3H9a3 3 0 0 1-3-3V12a3 3 0 0 1 3-3h3zm16 28a7 7 0 0 1 6-6.93V18H8v18a1 1 0 0 0 1 1h19.29a7 7 0 0 1-.29-2m7 5a5 5 0 1 0 0-10a5 5 0 0 0 0 10" clip-rule="evenodd"/><path d="M27 13a1 1 0 0 1-1-1v-1H16V9h10V7a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1"/></g></svg>
                </ListItemIcon>
                <ListItemText>
                  <p className="font-bold">Schedules</p>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
export default SideBar;
