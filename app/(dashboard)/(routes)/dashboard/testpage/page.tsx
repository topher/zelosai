// pages/testpage/page.js
"use client"
import React, { useContext } from 'react';
import { RDFContext } from '@/app/context/RDFContext';
import StatCard from '@/app/components/dashboard/StatCard';
import TripleCardPredicate from '../components/profile/TripleCardPredicate';

const TestPage = () => {
  const context = useContext(RDFContext);
  if (!context) {
    // Handle the case where context is null
    return null;
  }
  const { rdfData } = context;

    return (
        <div>
          {rdfData && rdfData.map((triple, index) => (
              <TripleCardPredicate key={index} triple={triple} />
          ))}
        </div>
    );
};

export default TestPage;
