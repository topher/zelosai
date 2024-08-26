// Location.tsx
import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dynamic from 'next/dynamic';
import { SafeBoat, SafeUser, SafePhysicalLocation } from '@/app/types';

interface LocationProps {
  location: SafePhysicalLocation;
}

const Map = dynamic(() => import('../Map'), { 
  ssr: false 
});

const Location: React.FC<LocationProps> = ({ 
  location = { address: '', latitude: 0, longitude: 0 } 
}) => {
  console.log(location,"🍋 location");
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  
  const coordinates: number[] | [0, 0] | undefined = location.latitude !== null && location.longitude !== null
    ? [location.latitude, location.longitude]
    : undefined;

  console.log(coordinates,"🍋 coordinates");

  return (
    <Accordion expanded={isAccordionOpen} onChange={() => setIsAccordionOpen(!isAccordionOpen)}>
      <AccordionSummary
        aria-controls="panel7a-content"
        id="panel7a-header"
      >
        <ExpandMoreIcon 
          className={`expandIcon ${isAccordionOpen ? 'expanded' : ''}`}
        />
        <Typography style={{ paddingLeft: '8px' }}>LOCATION</Typography>
      </AccordionSummary>
      <AccordionDetails>
      <p className="font-light text-neutral-600" style={{ fontSize: '0.8rem', paddingBottom: '20px', paddingLeft: '8px', fontStyle:'italic' }}>
        Exact location information is provided after an interest request is sent
      </p>


        <Map center={coordinates} />
      </AccordionDetails>
    </Accordion>
  );
}

export default Location;
