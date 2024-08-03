import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import landbg from '../Images/land-bg2.png';

const About = () => {
  window.location.href = '/about';
};

const Contact = () => {
  window.location.href = '/contact';
};

const Home = () => {
  window.location.href = '/home';
};

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

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Team Section styling
const TeamSection = styled.div`
  display: flex;
  gap: 150px;
  flex-direction: column;
  align-items: center;
  background-image: url(${landbg});
  height: 100vh;
  width: 100vw;
  background-size: cover;
  color: #333;
  padding-top: 5px;
  padding-right: 40px;
  padding-left: 40px;
  box-sizing: border-box;
  margin: 0px;
  padding-top: 100px;
`;

const Title = styled.h2`
  margin-bottom: 40px;
  font-weight: bold;
  font-size: 2rem;
  color: white;
  text-transform: uppercase;
  animation: ${fadeIn} 1.5s ease-in-out;

  &::after {
    content: "";
    display: block;
    width: 60px;
    height: 4px;
    background: #ff0000;
    margin: 10px auto 0;
    animation: ${slideIn} 1s ease-in-out;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  justify-items: center;
`;

const TeamCard = styled(motion.div)`
  background: #fff;
  text-align: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  transition: transform 0.3s ease-in-out;
  width: 250px;
  animation: ${fadeIn} 1s ease-in-out, ${slideIn} 1.5s ease-in-out;

  &:hover {
    transform: scale(1.05);
    border: 2px solid #ff0000;
  }
`;

const ProfilePicture = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 16px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const MemberName = styled.h3`
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 8px;
  color: #333;
  animation: ${fadeIn} 1s ease-in-out;
`;

const MemberTitle = styled.p`
  color: #ff0000;
  margin-bottom: 8px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const MemberDescription = styled.p`
  color: #888;
  animation: ${fadeIn} 1s ease-in-out;
`;

const teamMembers = [
  {
    name: 'Navneeth Arun',
    title: 'Founder & CEO',
    description: 'Navneeth is the visionary behind our event management system with over 20 years of experience in the industry.',
    imageUrl: '/path-to-image1.jpg',
  },
  {
    name: 'Harisankar.S',
    title: 'Chief Operating Officer',
    description: 'Harisankar ensures smooth operations and oversees the execution of all events with meticulous attention to detail.',
    imageUrl: '/path-to-image2.jpg',
  },
  {
    name: 'Afra Hakim',
    title: 'Head of Marketing',
    description: 'Afra leads our marketing efforts, bringing events to life through innovative campaigns and strategies.',
    imageUrl: '/path-to-image3.jpg',
  },
  {
    name: 'Achsa Gracin',
    title: 'Chief Technology Officer',
    description: 'Achsa drives our technology strategy and ensures our event management platform remains cutting-edge and efficient.',
    imageUrl: '/path-to-image4.jpg',
  },
];

const Team = () => {
  return (
    <>
      <Navbar>
        <NavTitle>Gleve.</NavTitle>
        <Nav>
          <NavLink onClick={Home}>Home</NavLink>
          <NavLink onClick={About}>About</NavLink>
          <NavLink onClick={Contact}>Contact</NavLink>
        </Nav>
      </Navbar>
      <TeamSection>
        <Title>Meet Our Team</Title>
        <GridContainer>
          {teamMembers.map((member, index) => (
            <TeamCard key={index}>
              <ProfilePicture alt={member.name} src={member.imageUrl} />
              <MemberName>{member.name}</MemberName>
              <MemberTitle>{member.title}</MemberTitle>
              <MemberDescription>{member.description}</MemberDescription>
            </TeamCard>
          ))}
        </GridContainer>
      </TeamSection>
    </>
  );
};

export default Team;
