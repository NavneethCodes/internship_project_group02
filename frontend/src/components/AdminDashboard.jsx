import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import './AdminDashboard.css';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f0f2f5;
`;

const Sidebar = styled.div`
  width: 250px;
  padding: 20px;
  background-color: #fff;
  border-right: 1px solid #ddd;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const TabButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  background-color: ${props => (props.active ? '#007bff' : '#fff')};
  color: ${props => (props.active ? '#fff' : '#007bff')};
  padding: 10px 20px;
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.active ? '#0056b3' : '#f0f0f0')};
  }
`;

const ScheduleHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  font-weight: bold;
`;

const ScheduleItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ScheduleTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const ScheduleTime = styled.span`
  font-size: 14px;
  color: #666;
`;

const StatusText = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.status === 'active' ? '#28a745' : '#dc3545')};
`;

const ScheduleActions = styled.div`
  display: flex;
  align-items: center;
`;

const BlockButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));

    axios.get('http://localhost:4000/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleBlockUser = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'suspend' : 'active';
      await axios.put(`http://localhost:4000/userupdate/${userId}`, { status: newStatus });
      setUsers(users.map(user =>
        user._id === userId ? { ...user, userStatus: newStatus } : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <Container>
      <Sidebar>
        <SidebarItem>Alerts</SidebarItem>
        <SidebarItem>Calendar</SidebarItem>
        <SidebarItem>Contacts</SidebarItem>
        <SidebarItem>Notifications</SidebarItem>
        <SidebarItem>Passwords</SidebarItem>
        <SidebarItem>Settings</SidebarItem>
      </Sidebar>
      <Main>
        <Header>
          <Title>Admin Dashboard</Title>
          <span>April, 1 Friday</span>
        </Header>
        <Content>
          <TabButtons>
            <TabButton
              active={activeTab === 'users'}
              onClick={() => setActiveTab('users')}
            >
              Users
            </TabButton>
            <TabButton
              active={activeTab === 'events'}
              onClick={() => setActiveTab('events')}
            >
              Events
            </TabButton>
          </TabButtons>
          {activeTab === 'users' && (
            <>
              <ScheduleHeader>
                <div>Username</div>
                <div>Phone Number</div>
                <div>Status</div>
                <div>Actions</div>
              </ScheduleHeader>
              <div>
                {users.map((user) => (
                  <ScheduleItem key={user._id}>
                    <ScheduleTitle>{user.userName}</ScheduleTitle>
                    <ScheduleTime>{user.userContact}</ScheduleTime>
                    <StatusText status={user.userStatus}>
                      {user.userStatus === 'active' ? 'Active' : 'Suspended'}
                    </StatusText>
                    <ScheduleActions>
                      <BlockButton
                        onClick={() => handleBlockUser(user._id, user.userStatus)}
                      >
                        {user.userStatus === 'active' ? 'Block User' : 'Unblock User'}
                      </BlockButton>
                    </ScheduleActions>
                  </ScheduleItem>
                ))}
              </div>
            </>
          )}
          {activeTab === 'events' && (
            <>
              <ScheduleHeader>
                <div>Event Name</div>
                <div>Event Date</div>
                <div>Like Count</div>
                <div>Comments</div>
              </ScheduleHeader>
              <div>
                {events.map((event) => (
                  <ScheduleItem key={event._id}>
                    <ScheduleTitle>{event.eventName}</ScheduleTitle>
                    <ScheduleTime>{new Date(event.eventDate).toLocaleDateString()}</ScheduleTime>
                    <CountContainer>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="https://img.icons8.com/ios/24/000000/like.png" alt="Likes" style={{ marginRight: '5px' }} />
                        <span>{event.likes.length} Likes</span>
                      </div>
                    </CountContainer>
                    <CountContainer>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="https://img.icons8.com/ios/24/000000/comments.png" alt="Comments" style={{ marginRight: '5px' }} />
                        <span>{event.comments.length} Comments</span>
                      </div>
                    </CountContainer>
                  </ScheduleItem>
                ))}
              </div>
            </>
          )}
        </Content>
      </Main>
    </Container>
  );
};

export default AdminDashboard;
