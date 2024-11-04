// app/(dashboard)/(routes)/search/predicates/components/PredicateGrid.tsx

import React, { useEffect, useRef } from 'react';
import TripleCardPredicate from '@/app/(dashboard)/(routes)/profiles/[type]/[id]/components/TripleCardPredicate';
import Masonry from 'masonry-layout';
import 'app/(dashboard)/(routes)/profiles/[type]/[id]/components/Profile.css'; // Updated import path

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
  subjectName?: string;
  type: 'athlete' | 'brand';
}

interface PredicateGridProps {
  triples: Triple[];
  gridClassName: string;
}

const PredicateGrid: React.FC<PredicateGridProps> = ({ triples, gridClassName }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const masonryInstance = useRef<Masonry | null>(null);

  useEffect(() => {
    if (gridRef.current) {
      // Initialize Masonry
      masonryInstance.current = new Masonry(gridRef.current, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 0, // Adjust gutter size if needed
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

  // Re-layout on mount when returning to the page
  useEffect(() => {
    if (masonryInstance.current) {
      masonryInstance.current.layout();
    }
  }, []);

  return (
    <div className={`my-masonry-grid ${gridClassName}`} ref={gridRef}>
      <div className="grid-sizer"></div>
      {triples.map((triple, index) => (
        <div className="grid-item" key={index}>
          <TripleCardPredicate triple={triple} />
        </div>
      ))}
    </div>
  );
};

export default PredicateGrid;
