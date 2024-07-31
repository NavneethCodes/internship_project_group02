import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  Snackbar,
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
`;

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
    imgsrc: '',
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
      eventStartTime: new Date(`${eventDetails.eventDate}T${eventDetails.eventStartTime}:00Z`),
      eventEndTime: new Date(`${eventDetails.eventDate}T${eventDetails.eventEndTime}:00Z`),
    };

    try {
      const response = await axios.post('http://localhost:4000/eventnew', eventPayload);
      setSnackbarMessage(response.data.message || 'Event created successfully!');
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
    <StyledContainer component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: '2em' }}>
        <Typography variant="h4" align="center" gutterBottom>
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
                name="imgsrc"
                value={eventDetails.imgsrc}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Create Event
            </Button>
          </Box>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Paper>
    </StyledContainer>
  );
};

export default AdminEvent;
