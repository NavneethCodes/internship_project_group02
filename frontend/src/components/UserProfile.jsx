import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import './UserProfile.css'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: #333;
  height: 100vh;
  width:100vw;
  padding-right: 50px;
  padding-left: 50px;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 2rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  height:100%;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Sidebar = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.div`
  flex: 2;
  padding: 2rem;
`;

const Avatar = styled(motion.img)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const UserName = styled.h2`
  margin: 0;
`;

const UserTitle = styled.p`
  color: #888;
`;

const FollowButton = styled(motion.button)`
  background: #ff5f5f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: #ff3f3f;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 1rem;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatNumber = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
`;

const StatLabel = styled.p`
  margin: 0;
  color: #888;
`;

const Biography = styled.p`
  margin-top: 1rem;
`;

const Collections = styled.div`
  margin-top: 2rem;
`;

const CollectionTitle = styled.h3`
  margin: 0;
`;

const CollectionList = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const CollectionItem = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: #ccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #bbb;
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 1rem;
  text-align: center;
`;

const UserProfile = () => {
  return (
    <Container>
      <Header>
        <Nav>
          <NavLink href="#back">Back</NavLink>
        </Nav>
        <Nav>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </Nav>
      </Header>
      <ProfileContainer>
        <Sidebar>
          <Avatar
            src="https://via.placeholder.com/100"
            alt="Profile"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <UserName>Dolapathy</UserName>
          <UserTitle>Gunda</UserTitle>
          <FollowButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Follow
          </FollowButton>
          <Stats>
            <Stat>
              <StatNumber>0</StatNumber>
              <StatLabel>Collections</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>0</StatNumber>
              <StatLabel>Followers</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>0</StatNumber>
              <StatLabel>Likes</StatLabel>
            </Stat>
          </Stats>
        </Sidebar>
        <MainContent>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>Ook Record</h1>
            <img src="https://via.placeholder.com/800x300" alt="Mountains" style={{ width: '100%', borderRadius: '10px' }} />
            <Biography>
              Naa Dolapathy , Parashaala ndh varaen. Ungall elaame yaen makkal maathiri. Love you guys !!!.
            </Biography>
            <Collections>
              <CollectionTitle>Popular Collections</CollectionTitle>
              <CollectionList>
                <CollectionItem whileHover={{ scale: 1.2 }}>1</CollectionItem>
                <CollectionItem whileHover={{ scale: 1.2 }}>2</CollectionItem>
                <CollectionItem whileHover={{ scale: 1.2 }}>3</CollectionItem>
                <CollectionItem whileHover={{ scale: 1.2 }}>4</CollectionItem>
              </CollectionList>
            </Collections>
          </motion.div>
        </MainContent>
      </ProfileContainer>
      <Footer>
        © 2024 by Gleve.
      </Footer>
    </Container>
  );
}

export default UserProfile;
