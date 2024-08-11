import React, { useState, useEffect } from "react";
import { InfoAsset } from "@/app/types";

export function useInfoAsset() {
  const [infoAsset, setInfoAsset] = useState<InfoAsset | null>(null);

  // Function to update infoAsset state based on fetched data
  const updateInfoAsset = (data: InfoAsset | null) => {
    console.log(infoAsset, "🐶🐶");
    setInfoAsset(data);
  };

  // Example usage (replace with actual data fetching logic)
  const fetchData = async () => {
    try {
      const response = await fetch("/api/infoAsset"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: InfoAsset = await response.json();
      updateInfoAsset(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      updateInfoAsset(null); // Reset or handle error state
    }
  };

  // Call to fetch data on component mount (or based on user interaction)
  useEffect(() => {
    fetchData();
  }, []);

  return { infoAsset, updateInfoAsset };
}
