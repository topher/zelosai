// app/components/ResultsPerPageSlider.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

interface ResultsPerPageSliderProps {
  hitsPerPage: number;
  onChangeHitsPerPage: (value: number) => void;
}

// Create a styled Slider component with the gradient track
const GradientSlider = styled(Slider)({
  color: "#4b0082", // Base color for the thumb and active track
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
    background: "linear-gradient(to right, #4b0082, #ff69b4, #b22222)",
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    background: "linear-gradient(to right, #4b0082, #ff69b4)",
    border: "2px solid white",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
  },
  "& .MuiSlider-rail": {
    opacity: 0.3,
    backgroundColor: "#bfbfbf",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
  },
  "& .MuiSlider-markLabel": {
    color: "#6e6e6e",
  },
});

const ResultsPerPageSlider: React.FC<ResultsPerPageSliderProps> = ({
  hitsPerPage,
  onChangeHitsPerPage,
}) => {
  const [value, setValue] = useState<number>(hitsPerPage);

  useEffect(() => {
    setValue(hitsPerPage);
  }, [hitsPerPage]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    const hits = newValue as number;
    setValue(hits);
    onChangeHitsPerPage(hits);
  };

  return (
    <div className="mt-4 text-darkGray">
      <Typography id="results-per-page-slider" gutterBottom>
        Results per page
      </Typography>
      <GradientSlider
        aria-labelledby="results-per-page-slider"
        value={value}
        min={6}
        max={22}
        step={null} // Disable arbitrary steps
        marks={[
          { value: 8, label: "8" },
          { value: 12, label: "12" },
          { value: 16, label: "16" },
          { value: 20, label: "20" },
        ]}
        valueLabelDisplay="auto"
        onChange={handleChange}
      />
    </div>
  );
};

export default ResultsPerPageSlider;
