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
        <Typography sx={{ fontSize: "4rem", color: "#4BA856" }}>
          Welcome to Deda Hospital
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
