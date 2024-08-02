import React from 'react';
import './About.css';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/system';

const HeroSection = styled('section')(({ theme }) => ({
  backgroundColor: 'transparent', // Remove or set to transparent
  color: theme?.palette?.common?.white || '#ffffff',
  padding: '2rem',
  textAlign: 'center',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme?.spacing(2) || '16px',
}));

const About = () => {
  return (
    <div className="about-page">
      <HeroSection>
        <Typography variant="h2" gutterBottom color='indigo'>
          Welcome to Gleve
        </Typography>
        <Typography variant="h5" color='pink'>
          Your Ultimate Solution for Seamless Event Management
        </Typography>
      </HeroSection>

      <Container>
        <Typography variant="h4" gutterBottom align="center" className="section-title">
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph align="center">
          At Gleve, we are dedicated to providing a comprehensive event management solution that simplifies the planning, organization, and execution of events. Whether it's a corporate conference, a wedding, or a community festival, our platform offers the tools you need to create unforgettable experiences.
        </Typography>

        <h3 align='centre'>Join us and make your next event a success. Lets experience the future of event management!</h3>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardMedia
                component="img"
                height="140"
                image="https://www.shutterstock.com/image-vector/events-colorful-typography-banner-260nw-1356206768.jpg"
                alt="Feature 1"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Easy Event Setup
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Set up events effortlessly with our intuitive interface. Customize event details, manage guest lists, and track RSVPs with ease.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardMedia
                component="img"
                height="140"
                image="https://static.toiimg.com/photo/msid-64957021,width-96,height-65.cms"
                alt="Feature 2"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Seamless Integration
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Integrate with various tools and services to streamline your event planning. Sync calendars, manage budgets, and more.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardMedia
                component="img"
                height="140"
                image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D"
                alt="Feature 3"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Real-Time Updates
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Keep your attendees informed with real-time updates. Send notifications, updates, and reminders to ensure everyone is on the same page.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>

        
      </Container>
    </div>
  );
}

export default About;
