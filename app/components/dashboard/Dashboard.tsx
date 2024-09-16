// pages/dashboard.js
import React, { useContext, useEffect, useRef } from 'react';
import { RDFContext } from '@/app/context/RDFContext'; // Adjust the path as needed
import { determineCardType } from '../../dashboard/determineCardType';
import Masonry from 'masonry-layout';


const Dashboard = () => {
  const { rdfData } = useContext(RDFContext);
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      new Masonry(gridRef.current, {
        itemSelector: '.mosaic-item', // class for your card component
        columnWidth: 200, // the width of your cards (adjust as needed)
        gutter: 10, // space between cards
      });
    }
  }, []);

  return (
    <div className="dashboard mosaic-layout" ref={gridRef} >
      {rdfData?.map((triple, index) => {
        const TripleCardComponent = determineCardType(triple);
        return <TripleCardComponent key={index} triple={triple} className="mosaic-item" />;
      })}
    </div>
  );
};

export default Dashboard;
