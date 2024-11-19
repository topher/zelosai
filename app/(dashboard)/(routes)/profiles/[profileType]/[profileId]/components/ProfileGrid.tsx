// /app/(dashboard)/(routes)/profiles/[type]/[id]/components/ProfileGrid.tsx

"use client";

import React, { useEffect, useState } from "react";
import TripleCardObject from "@/app/components/atomic/organisms/cards/triple-cards/TripleCardObject";
import Masonry from "masonry-layout";
import "./Profile.css"; // Ensure this CSS file includes Masonry-specific styles
import { Triple } from "@/app/types";
import { toast } from "react-hot-toast"; // Ensure react-hot-toast is installed and set up

interface ProfileGridProps {
  triples: Triple[];
  gridClassName: string; // ClassName for the grid type (e.g., 'masonry-grid')
}

const ProfileGrid: React.FC<ProfileGridProps> = ({ triples, gridClassName }) => {
  const [triplesState, setTriplesState] = useState<Triple[]>([]); // Initialize with empty array
  const gridRef = React.useRef<HTMLDivElement>(null);
  const masonryInstance = React.useRef<Masonry | null>(null);

  // Synchronize state with props
  useEffect(() => {
    setTriplesState(triples);
  }, [triples]);

  // Initialize Masonry layout
  useEffect(() => {
    if (gridRef.current) {
      masonryInstance.current = new Masonry(gridRef.current, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
      });

      // Cleanup on unmount
      return () => {
        masonryInstance.current?.destroy();
      };
    }
  }, []);

  // Update Masonry layout when triplesState changes
  useEffect(() => {
    if (masonryInstance.current) {
      masonryInstance.current.reloadItems();
      masonryInstance.current.layout();
    }
  }, [triplesState]);

  /**
   * Handler to update a triple in the state
   * @param updatedTriple - The triple object with updated data
   */
  const handleUpdateTriple = (updatedTriple: Triple) => {
    setTriplesState((prevTriples) =>
      prevTriples.map((triple) =>
        triple.id === updatedTriple.id ? updatedTriple : triple
      )
    );
  };

  /**
   * Handler to delete a triple from the state
   * @param deletedTripleId - The ID of the triple to delete
   */
  const handleDeleteTriple = async (deletedTripleId: string) => {
    try {
      const response = await fetch(`/api/resource/triples/${deletedTripleId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTriplesState((prevTriples) =>
          prevTriples.filter((triple) => triple.id !== deletedTripleId)
        );
        toast.success("Triple deleted successfully.");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete triple:", errorData);
        toast.error("Failed to delete triple.");
      }
    } catch (error) {
      console.error("Error deleting triple:", error);
      toast.error("Error deleting triple.");
    }
  };

  console.log("my-masonry-grid triplesState", triplesState);

  return (
    <div className={`my-masonry-grid ${gridClassName}`} ref={gridRef}>
      <div className="grid-sizer"></div>
      {triplesState.map((triple) => (
        <div className="grid-item" key={triple.id}>
          <TripleCardObject
            triple={triple}
            onUpdateTriple={handleUpdateTriple}
            onDeleteTriple={handleDeleteTriple}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileGrid;
