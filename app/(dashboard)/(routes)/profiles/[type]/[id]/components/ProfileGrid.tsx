// /app/(dashboard)/(routes)/profiles/[type]/[id]/components/ProfileGrid.tsx

import React, { useEffect, useRef } from 'react';
import TripleCardObject from '@/app/components/atomic/organisms/cards/triple-cards/TripleCardObject';
import Masonry from 'masonry-layout';
import './Profile.css';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface ProfileGridProps {
  triples: Triple[];
  gridClassName: string; // ClassName for the grid type
}

const ProfileGrid: React.FC<ProfileGridProps> = ({ triples, gridClassName }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const masonryInstance = useRef<Masonry | null>(null);

  useEffect(() => {
    if (gridRef.current) {
      // Initialize Masonry
      masonryInstance.current = new Masonry(gridRef.current, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
      });

      // Ensure layout after content is rendered
      setTimeout(() => {
        masonryInstance.current?.layout();
      }, 100);
    }

    // Cleanup on unmount
    return () => {
      masonryInstance.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (masonryInstance.current) {
      // Layout Masonry after a short delay when triples change
      setTimeout(() => {
        masonryInstance.current?.reloadItems();
        masonryInstance.current?.layout();
      }, 100);
    }
  }, [triples]);

  // Add a useEffect to re-layout on mount when returning to the page
  useEffect(() => {
    if (masonryInstance.current) {
      masonryInstance.current.layout(); // Force layout recalculation when the component mounts
    }
  }, []);

  return (
    <div className={`my-masonry-grid ${gridClassName}`} ref={gridRef}>
      <div className="grid-sizer"></div>
      {triples.map((triple, index) => (
        <div className="grid-item" key={index}>
          <TripleCardObject triple={triple} />
        </div>
      ))}
    </div>
  );
};

export default ProfileGrid;
