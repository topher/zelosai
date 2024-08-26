'use client'

import React, { useState, useEffect } from 'react';
import TripleCardPredicate from './TripleCardPredicate';
import TripleCardObject from './TripleCardObject';
import TripleCardSubject from './TripleCardSubject';
import AthleteHead from './AthleteHead';
import AthleteInfo from './AthleteInfo';
import CollaborationRequest from './CollaborationRequest';
import ProfileUserActions from './ProfileUserActions';
import ProfileHighlightCards from './ProfileHighlightCards';

interface Triple {
    subject: string;
    predicate: string;
    object: string;
    citation?: string;
  }

interface AthleteProfileProps {
  resource: Triple[];
}

const AthleteProfile: React.FC<AthleteProfileProps> = ({ resource }) => {
  console.log("lezzzgo")
    const [showName, setShowName] = useState(false);
    let lastScrollY = window.scrollY;
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
  
        if (currentScrollY < lastScrollY) {
          setShowName(true); // Scrolling up
        } else {
          setShowName(false); // Scrolling down
        }
  
        lastScrollY = currentScrollY;
      };
  
      window.addEventListener('scroll', handleScroll, { passive: true });
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  // Assuming resource is an array of triples
  const [triples, setTriples] = useState<Triple[]>(resource);

  useEffect(() => {
    // Filter out "ATHLETE" and "URL" predicates
    const filteredTriples = resource.filter(triple => triple.predicate !== 'ATHLETE' && triple.predicate !== 'URL');
    setTriples(filteredTriples);
  }, [resource]);

  return (
    <div className="athlete-profile bg-gradient-to-r from-dark-blue to-midnight-blue p-8">
              {/* Conditional rendering of the header */}
      <header>{showName ? 'Person’s Name' : <AthleteHead name={"John Doe"} imageSrc={"/placeholder_avatar.png"} hdriPath={"/christmas_photo_studio_03_4k.exr"} /> }</header>
      
      <ProfileHighlightCards athlete={triples[3]} />
    <div style={{ minHeight: '100px' /* Adjust as needed */ }}>
      <ProfileUserActions />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {triples.map((triple, index) => (
        <TripleCardObject key={index} triple={triple} />
      ))}
    </div>
  </div>
  );
};

export default AthleteProfile;