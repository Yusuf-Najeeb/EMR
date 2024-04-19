import React from "react";
import Image from "next/image";
import Logo from "../../../public/dedalogo.png";
import { Box, Button, MenuItem } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Link from "next/link";

const Header = () => {
  return (
    <Box
      sx={{
        background: "rgb(57, 108, 240)",
        color: "white",
        py: 2,
        px: 3,
        textAlign: "center",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "end",
      }}
    >
      <Box>
        <Box>
          <Box variant="img">
            <Link class="dark-logo" href="https://dedahospital.com/newsite/">
              <Image src={Logo} alt="Deda hospital logo" />
            </Link>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <MenuItem>Home</MenuItem>
        <MenuItem>About Us</MenuItem>
        <MenuItem>Our Services</MenuItem>
        <MenuItem>Patients & Visitors</MenuItem>
        <MenuItem>Contact</MenuItem>
        <MenuItem>
          <SearchRoundedIcon />
        </MenuItem>
        <Button sx={{ background: "#4BA856", color: "white", py: 1, px: 2 }}>
          Appointment
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
