// ContactInfo.tsx
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "@/app/globals.css";

interface Contact {
  seller: {
      name: string;
  };
  user: {
    name: string | null;
    email: string | null;
    // phone: string; // Uncomment this if you plan to use the phone property later
  };
}

interface ContactInfoProps {
  contact: Contact;
}

const ContactInfo: React.FC<ContactInfoProps> = ({contact}) => {
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(false);
  console.log(contact,"contact");
  return (
    <Accordion expanded={isAccordionOpen} onChange={() => setIsAccordionOpen(!isAccordionOpen)}>
      <AccordionSummary
        aria-controls="panel7a-content"
        id="panel7a-header"
      >
        <ExpandMoreIcon 
          className={`expandIcon ${isAccordionOpen ? 'expanded' : ''}`}
        />
        <Typography style={{ paddingLeft: '8px' }}>CONTACT INFORMATION</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography><strong>Seller</strong> {contact?.seller?.name}</Typography>
        <Typography><strong>Name:</strong> {contact?.user?.name}</Typography>
        <Typography><strong>Email:</strong> {contact.user.email}</Typography>
        {/* <Typography><strong>Phone:</strong> {contact.phone}</Typography> */}
      </AccordionDetails>
    </Accordion>
  )
}

export default ContactInfo;
