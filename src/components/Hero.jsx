import React from "react";
import "../../app/globals.css";
import { Box, Typography } from "@mui/material";
const Hero = () => {
  return (
    <Box className="banner">
      <Box
        sx={{
          position: "relative",
          left: 0,
          bottom: 0,
          background: "rgba(14, 55, 127, 0.5)",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "2rem", md: "3.4rem" },
            color: "#4BA856",
            textAlign: { xs: "center", md: "left" },
            p: 2,
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          Book a Private Session With Our Dedicated Expert
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
