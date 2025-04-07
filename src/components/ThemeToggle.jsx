import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { BrightnessHigh, BrightnessLow } from "@mui/icons-material";

const ThemeToggle = ({ mode, toggleMode }) => {
  return (
    <Tooltip title="Toggle theme">
      <IconButton color="inherit" onClick={toggleMode}>
        {mode === "dark" ? <BrightnessHigh /> : <BrightnessLow />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
