import { atom, useAtom } from "jotai";
import React from "react";
import { InfoAsset } from "@/app/types";

const infoAssetAtom = atom<InfoAsset | null>(null); // Initial state with null

export function useInfoAsset() {
  const [infoAsset, setInfoAsset] = useAtom(infoAssetAtom);

  // Function to update infoAsset state based on fetched data (replace with your actual logic)
  const updateInfoAsset = async (data: any) => {
    console.log(infoAsset, "🐶🐶")
    setInfoAsset(data);
  };

  // Example usage (replace with actual data fetching logic)
  const fetchData = async () => {
    const response = await fetch("/api/infoAsset"); // Replace with your API endpoint
    const data = await response.json();
    updateInfoAsset(data);
  };

  // Call to fetch data on component mount (or based on user interaction)
  React.useEffect(() => {
    fetchData();
  }, []);

  return { infoAsset, updateInfoAsset };
}
