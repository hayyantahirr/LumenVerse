import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#001229",
          py: 6,
          mt: 10,
          borderTop: "10px solid",
          borderColor: "divider",
          
        }}
      >
        <Container maxWidth="md">
          {/* Logo and Brand */}
          <Stack alignItems="center" spacing={1}>
            {/* Replace with your own logo */}
            <Box
              component="img"
              src="/public/Images/icon.svg" // Logo
              alt="Logo"
              sx={{ width: 50, height: 50 }}
            />
            <Typography variant="h5" fontWeight="bold" color="white">
              LumenVerse
            </Typography>
          </Stack>

          {/* Navigation Links */}
          <Grid container justifyContent="center" spacing={4} sx={{ mt: 3 }}>
            {["First Link", "Second Link", "Third Link", "Fourth Link"].map(
              (text) => (
                <Grid key={text}>
                  <Link
                    href="#"
                    underline="none"
                    color="white"
                    fontWeight="medium"
                  >
                    {text}
                  </Link>
                </Grid>
              )
            )}
          </Grid>

          {/* Social Media Icons */}

          {/* Copyright */}
          <Typography
            variant="body2"
            color="white"
            align="center"
            sx={{ mt: 3 }}
          >
            © {new Date().getFullYear()} LumenVerse. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
