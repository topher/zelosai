// pages/dashboard.js
'use client'
import React, { useContext, useEffect, useRef } from 'react';
import { RDFContext } from '@/app/context/RDFContext'; // Adjust the path as needed
import { determineCardType } from './determineCardType';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';


const Dashboard = () => {
  const { rdfData } = useContext(RDFContext);
  const gridRef = useRef(null);

  useEffect(() => {
    let masonryInstance: { layout: () => void; };
    if (gridRef.current) {
      new Masonry(gridRef.current, {
          itemSelector: '.triple-card',
          columnWidth: 200,
          gutter: 10,
      });

      imagesLoaded(gridRef.current, function () {
        masonryInstance?.layout();
      });
    }
  }, [rdfData]); // Assuming rdfData is your dependency
    

  return (
    <div className="mosaic-layout dashboard" ref={gridRef} >
      {rdfData?.map((triple, index) => {
        const TripleCardComponent = determineCardType(triple);
        return <TripleCardComponent key={index} triple={triple} className="triple-card" />;
      })}
    </div>
  );
};

export default Dashboard;
