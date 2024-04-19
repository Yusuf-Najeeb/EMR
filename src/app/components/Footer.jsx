import React from "react";

import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(to right, rgb(57, 108, 240), rgb(75, 168, 86))",
        color: "white",
        py: 5,
        px: 3,
        textAlign: "center",
      }}
    >
      <Typography>Copyright Deda &copy; 2024</Typography>
    </Box>
  );
};

export default Footer;
