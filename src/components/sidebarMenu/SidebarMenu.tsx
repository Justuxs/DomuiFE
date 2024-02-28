import React, { useState } from "react";
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";

const SidebarMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setIsDrawerOpen(true)}
        sx={{ mr: 2 }}
        data-testid="sidebar-open-button"
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} data-testid="sidebar-drawer">
        <Toolbar sx={{ width: "230px" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="close sidebar"
            onClick={() => setIsDrawerOpen(false)}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, mr: 2 }} align="center">
            Menu
          </Typography>
        </Toolbar>
        <hr />

        <List>
          {[
            { text: "Home Page", path: "/" },
            { text: "Pasiimti knyga", path: "/players" },
              { text: "Paimtos knygos", path: "/return" },
              { text: "Knygų istorija", path: "/history" },
              { text: "ADMIN", path: "/admin" }
          ].map((page) => (
            <div key={page.text}>
              <ListItem disablePadding>
                <ListItemButton component={Link} to={page.path} onClick={() => setIsDrawerOpen(false)}>
                  <ListItemText primary={page.text} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SidebarMenu;
