
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid
} from '@mui/material';

const AdminEventCreationForm = () => {
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    organizationName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., sending data to backend
    console.log('Event Details:', eventDetails);
  };

  return (
    <Container component="main" maxWidth="md">
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
                label="Title"
                name="title"
                value={eventDetails.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                name="date"
                value={eventDetails.date}
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
                label="Time"
                name="time"
                value={eventDetails.time}
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
                label="Location"
                name="location"
                value={eventDetails.location}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={eventDetails.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Organization Name"
                name="organizationName"
                value={eventDetails.organizationName}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Create Event
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminEventCreationForm;
