import React from 'react';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';
import { styled } from '@mui/system';

const ContactCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: theme.spacing(4, 'auto'),
  padding: theme.spacing(2),
  textAlign: 'center',
}));

const Contact = () => {
  return (
    <Container className="contact-page" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph align="center">
        We would love to hear from you! Please reach out to us at:
      </Typography>
      <ContactCard>
        <CardContent>
          <Box>
            <Typography variant="h5" gutterBottom>
              Phone Number
            </Typography>
            <Typography variant="body1" color="textSecondary">
              +1 (123) 456-7890
            </Typography>
          </Box>
        </CardContent>
      </ContactCard>
    </Container>
  );
};

export default Contact;
