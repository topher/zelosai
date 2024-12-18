import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type DescriptionProps = {
  description: string | null;
};

const Description: React.FC<DescriptionProps> = ({ description }) => {
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(false);

  return (
    <Accordion expanded={isAccordionOpen} onChange={() => setIsAccordionOpen(!isAccordionOpen)} className="my-4">
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
        <Typography>DESCRIPTION</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{description}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default Description;
