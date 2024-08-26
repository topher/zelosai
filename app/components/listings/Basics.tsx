import React from 'react';
import { Typography, Card, CardContent, Box, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const commonFontFamily = { fontFamily: '__Nunito_bfc3c1' };

const InfoCard: React.FC<{ title: string; value: any }> = ({ title, value }) => (
  <Card variant="outlined" style={{ marginBottom: '8px', borderRadius: '6px', boxShadow: 'none', borderColor: '#ddd' }}>
    <CardContent style={{ padding: '8px 12px' }}>
      <Typography variant="caption" color="textSecondary" style={commonFontFamily}>
        {title}
      </Typography>
      <Typography variant="body2" style={{ ...commonFontFamily, fontWeight: '500' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const NestedInfoCard: React.FC<{ title: string; data: any }> = ({ title, data }) => (
  <Card variant="outlined" style={{ marginBottom: '12px', borderRadius: '6px', boxShadow: 'none', borderColor: '#ddd' }}>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`accordion-content-${title}`}
        id={`accordion-header-${title}`}
      >
        <Typography variant="body1" style={{ ...commonFontFamily, fontWeight: '500', padding: '0px 16px' }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {Object.entries(data).map(([key, value], index) => 
            <InfoCard key={index} title={key} value={value} />
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  </Card>
);

const Basics: React.FC<{ basics: any }> = ({ basics }) => {
  const [isAccordionOpen, setIsAccordionOpen] = React.useState(false);
  return (
    <Accordion expanded={isAccordionOpen} onChange={() => setIsAccordionOpen(!isAccordionOpen)}>
      <AccordionSummary
        aria-controls="panel7a-content"
        id="panel7a-header"
      >
        <ExpandMoreIcon 
          className={`expandIcon ${isAccordionOpen ? 'expanded' : ''}`}
        />
        <Typography style={{ paddingLeft: '8px' }}>
          BASICS
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box width="100%" padding={2}>
          <Grid container spacing={2}>
            {Object.entries(basics).map(([key, value], index) => {
              if (typeof value === 'object') {
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <NestedInfoCard title={key} data={value} />
                  </Grid>
                );
              } else {
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <InfoCard title={key} value={value} />
                  </Grid>
                );
              }
            })}
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default Basics;
