import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import landbg from '../Images/land-bg2.png';

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

// Contact Section styling
const ContactSection = styled.div`
  display: flex;
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

const ContactCardsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
`;

const ContactCard = styled(motion.div)`
  background: #fff;
  text-align: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  transition: transform 0.3s ease-in-out;
  width: 250px;
  margin: 10px;
  animation: ${fadeIn} 1s ease-in-out, ${slideIn} 1.5s ease-in-out;

  &:hover {
    transform: scale(1.05);
    border: 2px solid #ff0000;
  }
`;

const ContactDetail = styled.div`
  margin-bottom: 20px;
`;

const ContactInfo = styled.h5`
  margin-bottom: 10px;
  font-size: 1.25rem;
  color: #333;
  animation: ${fadeIn} 1s ease-in-out;
`;

const ContactDescription = styled.p`
  color: #888;
  animation: ${fadeIn} 1s ease-in-out;
`;

const contactDetails = [
  {
    info: 'Phone Number',
    description: '+1 (123) 456-7890',
  },
  {
    info: 'Email',
    description: 'contact@company.com',
  },
  {
    info: 'Address',
    description: '123 Main St, City, Country',
  },
  {
    info: 'Office Hours',
    description: 'Monday - Friday: 9:00 AM - 5:00 PM',
  },
];

const Contact = () => {
  return (
    <>
      <Navbar>
        <NavTitle>Gleve.</NavTitle>
        <Nav>
          <NavLink href="/home">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/team">Team</NavLink>
        </Nav>
      </Navbar>
      <ContactSection>
        <Title>Contact Us</Title>
        <ContactCardsContainer>
          {contactDetails.map((detail, index) => (
            <ContactCard key={index}>
              <ContactDetail>
                <ContactInfo>{detail.info}</ContactInfo>
                <ContactDescription>{detail.description}</ContactDescription>
              </ContactDetail>
            </ContactCard>
          ))}
        </ContactCardsContainer>
      </ContactSection>
    </>
  );
};

export default Contact;
