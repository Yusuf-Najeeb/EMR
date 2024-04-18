import React from "react";
import Image from "../../../public/image.png";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(to right, rgb(6, 42, 85), rgb(97, 0, 156))",
        color: "white",
        py: 5,
        px: 3,
        textAlign: "center",
      }}
    >
      <Typography>DEDA EMR</Typography>
    </Box>
  );
};

export default Header;
