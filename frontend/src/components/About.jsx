import React from 'react';
import styled from 'styled-components';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import landbg from '../Images/land-bg2.png';

// Navbar styling
const Navbar = styled.nav`
  width: 100vw;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  z-index: 100;
  backdrop-filter: blur(10px);
`;

const NavTitle = styled.h1`
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  margin-left: 40px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 50px;
`;

const NavLink = styled.a`
  position: relative;
  margin-right: 30px;
  text-decoration: none;
  color: white;
  font-weight: 500;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 0.4s ease-in-out;
  }

  &:hover:after {
    width: 100%;
  }
`;

const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image:url(${landbg});
  height:100vh;
  width:100vw;
  background-size: cover;
  color: #333;
  padding-top:5px;
  padding-right: 40px;
  padding-left:40px;
  box-sizing: border-box;
  margin:0px;
`;

const FeatureCard = styled(Card)`
  max-width: 345px;
  margin: 16px;
  background-color: rgba(255, 255, 255, 0.8);
`;

const About = () => {
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="about-page">
      <Navbar>
        <NavTitle>Gleve.</NavTitle>
        <Nav>
          <NavLink onClick={() => navigateTo('/home')}>Home</NavLink>
          <NavLink onClick={() => navigateTo('/contact')}>Contact</NavLink>
          <NavLink onClick={() => navigateTo('/team')}>Team</NavLink>
        </Nav>
      </Navbar>
      <AboutSection>
        <Container>
          <Typography variant="h2" gutterBottom color="indigo">
            Welcome to Gleve
          </Typography>
          <Typography variant="h5" color="pink">
            Your Ultimate Solution for Seamless Event Management
          </Typography>

          <Typography variant="h4" gutterBottom align="center" className="section-title">
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph align="center">
            At Gleve, we are dedicated to providing a comprehensive event management solution that simplifies the planning, organization, and execution of events. Whether it's a corporate conference, a wedding, or a community festival, our platform offers the tools you need to create unforgettable experiences.
          </Typography>

          <Typography variant="h6" align="center">
            Join us and make your next event a success. Let's experience the future of event management!
          </Typography>

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
      </AboutSection>
    </div>
  );
};

export default About;
