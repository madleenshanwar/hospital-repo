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
  const route=useNavigate()
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
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} className="logo">
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
              <Avatar
                alt="Remy Sharp"
                sx={{ border: "3px solid #D5E4E6" }}
              />
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
        <Box  sx={{background:'#E5EEEF'}}>
           {/* Department section*/}
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="#015D67"><path d="M28.99 30V16.98c0-.54-.44-.99-.99-.99h-8V12h2v1.19c0 .45.36.81.8.81h3.39c.45 0 .81-.36.81-.8V4.81c0-.45-.36-.81-.8-.81h-3.39c-.45 0-.81.36-.81.81V6h-2V2.92c0-.51-.41-.92-.92-.92H3.92c-.51 0-.92.41-.92.92v27.06h1.98v-4.95c0-.57.46-1.03 1.03-1.03h10.96c.57 0 1.03.46 1.03 1.03V30h-.99v-4.65c0-.19-.15-.35-.35-.35h-2.28c-.19 0-.35.15-.35.35V30H11zM20 27.01V24h1.5c.28 0 .5.23.5.5v2c0 .28-.22.5-.5.51zm0-5V19h1.5c.28 0 .5.23.5.5v2c0 .28-.22.5-.5.51zM22 11h-2V7h2zm5 8.5v2c0 .28-.22.5-.5.51h-2.02c-.28 0-.5-.23-.5-.5V19.5c0-.28.23-.5.5-.5h2.02c.28 0 .5.23.5.5m0 5v2c0 .28-.22.5-.5.51h-2.02c-.28 0-.5-.23-.5-.5V24.5c0-.28.23-.5.5-.5h2.02c.28 0 .5.23.5.5m-13.99-20v2c0 .28-.22.5-.5.5h-2.02c-.28 0-.5-.23-.5-.5v-2c0-.28.23-.5.5-.5h2.02c.28 0 .5.23.5.5m0 7c0 .28-.22.5-.5.5h-2.02c-.28 0-.5-.23-.5-.5v-2c0-.28.23-.5.5-.5h2.02c.28 0 .5.23.5.5zm0 3v2c0 .28-.22.5-.5.51h-2.02c-.28 0-.5-.23-.5-.5V14.5c0-.28.23-.5.5-.5h2.02c.28 0 .5.23.5.5m0 5v2c0 .28-.22.5-.5.51h-2.02c-.28 0-.5-.23-.5-.5V19.5c0-.28.23-.5.5-.5h2.02c.28 0 .5.23.5.5m5.01 2c0 .28-.23.5-.5.51H15.5c-.28 0-.5-.23-.5-.5V19.5c0-.28.23-.5.5-.5h2.02c.28 0 .5.23.5.5zm0-7v2c0 .28-.23.5-.5.51H15.5c-.28 0-.5-.23-.5-.5V14.5c0-.28.23-.5.5-.5h2.02c.28 0 .5.23.5.5m0-3c0 .28-.23.5-.5.5H15.5c-.28 0-.5-.23-.5-.5v-2c0-.28.22-.5.5-.5h2.02c.28 0 .5.23.5.5zm0-7v2c0 .28-.23.5-.5.5H15.5c-.28 0-.5-.22-.5-.5v-2c0-.28.22-.5.5-.5h2.02c.28 0 .5.23.5.5m-10.01 17c0 .28-.22.5-.5.51H5.49c-.28 0-.5-.23-.5-.5V19.5c0-.28.23-.5.5-.5h2.02c.28 0 .5.23.5.5zm0-7v2c0 .28-.22.5-.5.51H5.49c-.28 0-.5-.23-.5-.5V14.5c0-.28.23-.5.5-.5h2.02c.28 0 .5.23.5.5m0-3c0 .28-.22.5-.5.5H5.49c-.28 0-.5-.23-.5-.5v-2c0-.28.23-.5.5-.5h2.02c.28 0 .5.23.5.5zm0-7v2c0 .28-.22.5-.5.5H5.49c-.28 0-.5-.23-.5-.5v-2c0-.28.23-.5.5-.5h2.02c.28 0 .5.23.5.5"/><path d="M13 30h-2.98v-4.65c0-.2.16-.35.35-.35h2.28c.19 0 .35.15.35.35zm-4.02-4.65V30H6v-4.65c0-.2.15-.35.35-.35h2.28c.2 0 .35.16.35.35"/></g></svg>
              </ListItemIcon>
              <ListItemText onClick={()=>route('/')}>
                <p className="font-bold">Department</p>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        {/* Room section */}
        <List>
          <ListItem disablePadding>
            <ListItemButton >
              <ListItemIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 2048 2048"><path fill="#015D67" d="M1920 128v1664h-442l-473 95l-237 47V779l640-128v-11H640v1152H128V128zM896 885v893l512-103V782zm896 779V256H256v1408h256V512h1024v1152z"/></svg>
              </ListItemIcon>
              <ListItemText>
                <p className="font-bold">Room</p>
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
