import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SidebarMenu from "../sidebarMenu/SidebarMenu";
import { logout } from "../../services/AuthService";

const NavigationBar: React.FunctionComponent = () => {
  const onLogout = () => {
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <SidebarMenu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="center">
            <AutoStoriesIcon fontSize="large" sx={{ marginRight: 1, verticalAlign: "middle" }} />
            BIBLIOTEKA
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
