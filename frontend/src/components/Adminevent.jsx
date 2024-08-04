import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import './Adminevent.css'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  Snackbar,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import axios from 'axios';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledContainer = styled(Container)`
  animation: ${fadeIn} 0.5s ease-in-out;
  padding: 2em;
  background-color: #f5f5f5;
`;

const StyledPaper = styled(Paper)`
  padding: 2em;
  margin-top: 2em;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  border: 0;
  border-radius: 15px;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
`;

const theme = createTheme({
  typography: {
    fontFamily:'Poppins',
    h4: {
      fontWeight: 600,
      color: '#333',
    },
    body1: {
      fontSize: '1rem',
      color: '#666',
    },
  },
  palette: {
    primary: {
      main: '#3f51b5',
    },
  },
});

const AdminEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventDate: '',
    eventStartTime: '',
    eventEndTime: '',
    eventLocation: '',
    eventDescription: '',
    eventOrganizer: '',
    eventCategory: '',
    eventImg: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventPayload = {
      ...eventDetails,
      eventDate: new Date(eventDetails.eventDate),
      eventStartTime: new Date(`${eventDetails.eventDate}T${eventDetails.eventStartTime}`),
      eventEndTime: new Date(`${eventDetails.eventDate}T${eventDetails.eventEndTime}`),
    };

    try {
      const response = await axios.post('http://localhost:4000/eventnew', eventPayload);
      setSnackbarMessage(response.data.message || 'Event created successfully!');
      await axios.get(`http://localhost:4000/send-email-to-all/${response.data.event._id}`);
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error creating event');
      setOpenSnackbar(true);
      console.error('Error:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer component="main" maxWidth="md">
        <StyledPaper elevation={3}>
          <Typography variant='h4' align="center" gutterBottom>
            Create a New Event
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Name"
                  name="eventName"
                  value={eventDetails.eventName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  label="Event Date"
                  name="eventDate"
                  value={eventDetails.eventDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="time"
                  label="Event Start Time"
                  name="eventStartTime"
                  value={eventDetails.eventStartTime}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="time"
                  label="Event End Time"
                  name="eventEndTime"
                  value={eventDetails.eventEndTime}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Location"
                  name="eventLocation"
                  value={eventDetails.eventLocation}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Description"
                  name="eventDescription"
                  value={eventDetails.eventDescription}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Organizer"
                  name="eventOrganizer"
                  value={eventDetails.eventOrganizer}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Category"
                  name="eventCategory"
                  value={eventDetails.eventCategory}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="eventImg"
                  value={eventDetails.eventImg}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box mt={3}>
              <StyledButton type="submit" fullWidth variant="contained" color="primary">
                Create Event
              </StyledButton>
            </Box>
          </form>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
          />
        </StyledPaper>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default AdminEvent;
