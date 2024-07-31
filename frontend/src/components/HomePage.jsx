import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Dummy from './Dummy.jsx'
import landbg from '../Images/land-bg2.png'



const routing = ()=>{
  window.location.href='/login';
}


const Container = styled.div`
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

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 2rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  position:relative;
  color:white;
`;

const Nav = styled.nav`
  display: flex;
  gap: 70px;
`;

const NavLink = styled.a`
  position: relative;
  text-decoration: none;
  color: white;
  font-weight: 500;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px; // Adjust the position of the underline
    width: 0;
    height: 2px; // Adjust the thickness of the underline
    background-color: white;
    transition: width 0.4s ease-in-out;
  }

  &:hover:after {
    width: 100%;
  }
`;
const MainSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  margin-right:55rem;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color:white;
`;

const Subtitle = styled.p`
  font-size: 22px;
  color:white;
  width:600px;
  `;

const Button = styled(motion.button)`
  background-color: white;
  color: black;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 18px;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top:100px;
  width:200px;
  height:60px;
  transition:all 0.3s ease-in-out;

    &:hover {
    background-color:black ;
    color:white
  }
`;

const IconGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top:300px;
  width:600px;
`;

const Icon = styled(motion.div)`
  width: 80px;
  height: 80px;
  background-color: white;
  color:black;
  backdrop-filter:blur(50px);
  border-radius: 0.5rem;
  display: flex;
  border:none;
  border-radius:50px;
  justify-content: center;
  align-items: center;
  font-size: 2rem;

    &:hover {
    background-color:black ;
    color:white;
  }
`;


function HomePage() {
  return (
    <Container>
      <Header>
        <Logo>Gleve.</Logo>
        <Nav>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#careers">Contact</NavLink>
          <NavLink href="#team">Team</NavLink>
        </Nav>
      </Header>
      <MainSection
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Title>Unlock your interests with Team Gleve.</Title>
        </motion.div>
        <Subtitle>All events around the globe at one place.</Subtitle>
        <Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={routing}
        >
          <span className="get-started">Get started !</span>
        </Button>
        <IconGrid>
          <Icon whileHover={{ scale: 1.2 }}><FaInstagram /></Icon>
          <Icon whileHover={{ scale: 1.2 }}><FaFacebook /></Icon>
          <Icon whileHover={{ scale: 1.2 }}><FaGithub /></Icon>
          <Icon whileHover={{ scale: 1.2 }}><FaDiscord /></Icon>
          <Icon whileHover={{ scale: 1.2 }}><FaGoogle /></Icon>
        </IconGrid>
        
      </MainSection>
 
      <Dummy/>

    </Container>
  );
}

export default HomePage;
