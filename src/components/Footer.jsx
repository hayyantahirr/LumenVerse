import { Box, Container, Grid, Link, Typography, Stack } from "@mui/material";

const Footer = () => {
  // Your navigation links with their actual destinations
  const navLinks = [
    { text: "Home", href: "/" },
    { text: "Blog", href: "/blogs" },
    { text: "Add Blog", href: "/addblogs" }
  ];

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
            {navLinks.map((link) => (
              <Grid item key={link.text}>
                <Link
                  href={link.href}
                  underline="none"
                  color="white"
                  fontWeight="medium"
                >
                  {link.text}
                </Link>
              </Grid>
            ))}
          </Grid>

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
