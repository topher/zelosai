// /app/(dashboard)/(routes)/search/components/ResultsPerPageSlider.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

interface ResultsPerPageSliderProps {
  hitsPerPage: number;
  onChangeHitsPerPage: (value: number) => void;
}

// Create a styled Slider component with a subtle gradient track
const CustomSlider = styled(Slider)({
  color: "#6366F1", // Base color for the thumb and active track
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
    background: "linear-gradient(to right, #6366F1, hsl(var(--primary)))",
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "hsl(var(--primary))",
    border: "2px solid #FFFFFF",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "0 0 0 8px rgba(99, 102, 241, 0.16)",
    },
  },
  "& .MuiSlider-rail": {
    opacity: 0.3,
    backgroundColor: "#4B5563",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#4B5563",
    height: 8,
    width: 1,
  },
  "& .MuiSlider-markLabel": {
    color: "#D1D5DB",
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
    <div className="mt-4 text-white">
      <Typography id="results-per-page-slider" gutterBottom>
        Results per page
      </Typography>
      <CustomSlider
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
