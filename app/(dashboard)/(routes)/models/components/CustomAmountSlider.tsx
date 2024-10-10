// models/components/CustomAmountSlider.tsx

"use client";

import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

interface CustomAmountSliderProps {
  value: number;
  onChangeValue: (value: number) => void;
}

const GradientSlider = styled(Slider)({
  color: "#4b0082",
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

const CustomAmountSlider: React.FC<CustomAmountSliderProps> = ({
  value,
  onChangeValue,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(value);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    const amount = newValue as number;
    setSliderValue(amount);
    onChangeValue(amount);
  };

  return (
    <GradientSlider
      value={sliderValue}
      min={0}
      max={5}
      step={null}
      marks={[
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
      ]}
      valueLabelDisplay="auto"
      onChange={handleChange}
    />
  );
};

export default CustomAmountSlider;
