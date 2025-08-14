import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/Firebase/firebase";
import { useNavigate } from "react-router";
import Login from "./Login";
import Register from "./Register";

// Make them objects so we can attach paths/actions later
const pages = [
  { label: "Home", path: "" }, // add your path here e.g. "/"
  { label: "Blogs", path: "" }, // add your path here e.g. "/blogs"
  { label: "Add Blog !", path: "" }, // add your path here e.g. "/add-blog"
];

const settings = [
  { label: "Profile", path: "" }, // add your path here e.g. "/profile"
  { label: "Logout", action: "logout" }, // this will call logout()
];
function ResponsiveAppBar() {
  // Material Ui states
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Modal states

  const [modalType, setModalType] = useState(null); // "login" or "register" or null
  const modalRef = useRef();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // Firebase functions
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
        console.log(uid);
      } else {
        // User is signed out
        // ...
        navigate("/");
      }
    });
  }, []);

  // Logout functionality
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.

        console.log("user signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  // Login modal logic and functions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalType(null);
      }
    };
    if (modalType) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalType]);

  // Material ui functions
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Normal Screen Logo and title  */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 500,

              color: "inherit",
              textDecoration: "none",
            }}
          >
            LumenVerse
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <Button
                  key={page.label}
                  onClick={() => {
                    handleCloseNavMenu();
                    // if (page.path) navigate(page.path); // enable later
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              ))}
            </Menu>
          </Box>

          {/* short screen Logo and title */}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LumenVerse
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <MenuItem
                key={page.label}
                onClick={() => {
                  handleCloseNavMenu();
                  // if (page.path) navigate(page.path); // enable later
                }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  {page.label}
                </Typography>
              </MenuItem>
            ))}
          </Box>
          {/* Profile and settings part  */}
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="View More ...">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/Images/No profile pic.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.label}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting.action === "logout") {
                        logout();
                      }
                      // else if (setting.path) navigate(setting.path); // enable later
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <button
              onClick={() => setModalType("login")}
              className="cursor-pointer"
            >
              Sign In
            </button>
          )}
          {/* Modal Overlay */}
          {modalType && (
            <div className="modal-overlay">
              <div className="modal-content" ref={modalRef}>
                {modalType === "login" && <Login setModalType={setModalType} />}
                {modalType === "register" && (
                  <Register setModalType={setModalType} />
                )}
              </div>
            </div>
          )}

          {/* login button logic  */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
