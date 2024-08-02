import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';

const TeamCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  textAlign: 'center',
}));

const teamMembers = [
  {
    name: 'Navneeth Arun',
    title: 'Founder & CEO',
    description: 'John is the visionary behind our event management system with over 20 years of experience in the industry.',
  },
  {
    name: 'Harishankar',
    title: 'Chief Operating Officer',
    description: 'Jane ensures smooth operations and oversees the execution of all events with meticulous attention to detail.',
  },
  {
    name: 'Afra Hakim',
    title: 'Head of Marketing',
    description: 'Emily leads our marketing efforts, bringing events to life through innovative campaigns and strategies.',
  },
  // Add more team members as needed
];

const Team = () => {
  return (
    <Container className="team-page" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Meet Our Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} md={4} key={index}>
            <TeamCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {member.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.description}
                </Typography>
              </CardContent>
            </TeamCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Team;
