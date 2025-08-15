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
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../config/Firebase/firebase";
import { useNavigate } from "react-router";
import Login from "./Login";
import Register from "./Register";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Make them objects so we can attach paths/actions later
const pages = [
  { label: "Home", path: "/" }, // add your path here e.g. "/"
  { label: "Reviews", path: "#reviews" }, // add your path here e.g. "/blogs"
  { label: "Blogs", path: "/blogs" }, // add your path here e.g. "/add-blog"
  { label: "Add Blogs", path: "/addblogs" }, // add your path here e.g. "/add-blog"
];

function ResponsiveAppBar() {
  // Material Ui states
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Modal states
  const [profilePic, setProfilePic] = useState(false);
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
        setUser(null); // instantly updates navbar
        navigate("/"); // optional redirect
        console.log("user signed out successfully");
      })
      .catch((error) => {
        console.error(error);
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

  // Get data from Firestore for profile pic
  const defaultPic = "/Images/No profile pic.jpg";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const data = snap.data();
          setProfilePic(data.profilePic || defaultPic);
        } else {
          // Create user profile if not exists
          await setDoc(userRef, {
            userName: user.displayName || "New User",
            userEmail: user.email,
            profilePic: user.photoURL || defaultPic,
            createdAt: new Date(),
          });
          setProfilePic(user.photoURL || defaultPic);
        }
      } else {
        setProfilePic(defaultPic);
      }
    });

    return () => unsub();
  }, []);

  const settings = [
    { label: "Profile", path: "/profile/" + user?.uid }, // add your path here e.g. "/profile"
    { label: "Logout", action: "logout" }, // this will call logout()
  ];
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
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#001229",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.9)",
        zIndex: "1",
      }}
    >
      <div className="w-[80%] mx-auto">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Normal Screen Logo and title  */}
            <Box
              component="img"
              src="/Images/Logo (1).png"
              alt="LumenVerse Logo"
              sx={{ display: { xs: "none", md: "flex" }, mr: 3, width: "5%" }}
            />

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "nunito",
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
                    onClick={() => {
                      handleCloseNavMenu();
                      if (!user && page.path === "/addblogs") {
                        setModalType("login");
                        return;
                      }
                      if (!user && page.path === "/blogs") {
                        setModalType("login");
                        return;
                      }

                      if (page.path === "#reviews") {
                        const element = document.getElementById("reviews");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      } else {
                        if (page.path) navigate(page.path); // enable later
                      }
                    }}
                    sx={{ color: "black", display: "block" }}
                  >
                    {page.label}
                  </Button>
                ))}
              </Menu>
            </Box>

            {/* short screen Logo and title */}
            <Box
              component="img"
              src="/Images/Logo (1).png"
              alt="LumenVerse Logo"
              sx={{ display: { xs: "flex", md: "none" }, mr: 3, width: "10%" }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "nunito",
                fontWeight: 500,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LumenVerse
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    if (!user && page.path === "/addblogs") {
                      setModalType("login");
                      return;
                    }
                    if (!user && page.path === "/blogs") {
                      setModalType("login");
                      return;
                    }

                    if (page.path === "#reviews") {
                      const element = document.getElementById("reviews");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    } else {
                      if (page.path) navigate(page.path); // enable later
                    }
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
                    <Avatar alt="" src={profilePic} />
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
                        } else if (setting.path) navigate(setting.path); // enable later
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
                id="navbar-login-btn"
              >
                Sign In
              </button>
            )}
            {/* Modal Overlay */}
            {modalType && (
              <div className="modal-overlay">
                <div className="modal-content" ref={modalRef}>
                  {modalType === "login" && (
                    <Login setModalType={setModalType} />
                  )}
                  {modalType === "register" && (
                    <Register setModalType={setModalType} />
                  )}
                </div>
              </div>
            )}

            {/* login button logic  */}
          </Toolbar>
        </Container>
      </div>
    </AppBar>
  );
}
export default ResponsiveAppBar;
