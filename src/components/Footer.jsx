import React from "react";
import { Box, Container, Grid, Typography, Link, Stack, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: theme.spacing(6, 0),
  position: "sticky",
  bottom: 0,
  width: "100%",
  zIndex: 1000
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: "#fff",
  textDecoration: "none",
  transition: "color 0.3s ease",
  "&:hover": {
    color: theme.palette.secondary.light
  }
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    transform: "scale(1.1)"
  }
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const userLinks = [
    { title: "User Dashboard", path: "/dashboard" },
    { title: "Sign Up", path: "/signup" },
    { title: "Login", path: "/login" },
    { title: "Forgot Password", path: "/forgot-password" }
  ];

  const universityLinks = [
    { title: "University Sign Up", path: "/university/signup" },
    { title: "University Login", path: "/university/login" },
    { title: "University Dashboard", path: "/university/dashboard" }
  ];

  const adminLinks = [
    { title: "Admin Dashboard", path: "/admin/dashboard" }
  ];

  const legalLinks = [
    { title: "Privacy Policy", path: "/privacy" },
    { title: "Terms of Service", path: "/terms" },
    { title: "Cookie Policy", path: "/cookies" },
    { title: "GDPR Statement", path: "/gdpr" }
  ];

  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>User Links</Typography>
            <Stack spacing={1}>
              {userLinks.map((link) => (
                <StyledLink 
                  key={link.path}
                  href={link.path}
                  aria-label={link.title}
                >
                  {link.title}
                </StyledLink>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>University Links</Typography>
            <Stack spacing={1}>
              {universityLinks.map((link) => (
                <StyledLink 
                  key={link.path}
                  href={link.path}
                  aria-label={link.title}
                >
                  {link.title}
                </StyledLink>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Legal</Typography>
            <Stack spacing={1}>
              {legalLinks.map((link) => (
                <StyledLink 
                  key={link.path}
                  href={link.path}
                  aria-label={link.title}
                >
                  {link.title}
                </StyledLink>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Contact Us</Typography>
            <Stack spacing={1}>
              <Typography variant="body2">Mesh Management</Typography>
              <Typography variant="body2">support@meshmanagement.com</Typography>
              <Typography variant="body2">+1 (555) 123-4567</Typography>
              <Box sx={{ mt: 2 }}>
                <SocialButton aria-label="Twitter">
                  <FaTwitter />
                </SocialButton>
                <SocialButton aria-label="Facebook">
                  <FaFacebook />
                </SocialButton>
                <SocialButton aria-label="LinkedIn">
                  <FaLinkedin />
                </SocialButton>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Mesh Management. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;