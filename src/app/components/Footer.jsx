import React from "react";

import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(0, 29, 78)",
        color: "white",
        py: 5,
        px: 3,
        textAlign: "center",
      }}
    >
      <Typography>Copyright 2024</Typography>
    </Box>
  );
};

export default Footer;
