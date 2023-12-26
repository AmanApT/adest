"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import React from "react";
import "@/components/landingpage/Navbar.css";
import Link from "next/link";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

interface Props {
  window?: () => Window;
}

export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Adest
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link href={
                    item === "About"
                      ? "#about-us"
                      : item === "Contact"
                      ? "#contact"
                      : ""
                  }>
                <ListItemText primary={item} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", marginBottom: "5%" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar
          sx={{
            height: "7vh",
            backgroundColor: "rgb(0, 5, 34)",
            boxShadow: "0px 0px 20px 2px rgba(212, 138, 247, 0.55)",
            // padding: "2.5rem 2rem 2.5rem 2rem",
            paddingTop: { xs: "2rem", sm: "2.5rem" },
            paddingBottom: { xs: "2rem", sm: "2.5rem" },
            paddingLeft: "2rem",
          }}
          //   style={{ padding: "2.5rem 4rem" }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              marginLeft: "3.5rem",
              fontSize: "1.7rem",
              fontWeight: "600",
            }}
          >
            Adest
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: "2rem",
              marginRight: "2rem",
            }}
          >
            {navItems.map((item) => (
              <div key={item} className="navbar-item">
                <Link
                style={{scrollBehavior:'smooth'}}
                  href={
                    item === "About"
                      ? "#about-us"
                      : item === "Contact"
                      ? "#contact"
                      : ""
                  }
                >
                  {item}
                </Link>
              </div>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              //   backgroundColor: "rgb(0, 5, 34)",
              backgroundColor: "#000522",
              color: "white",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
