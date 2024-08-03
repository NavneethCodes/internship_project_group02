import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AdminEvent from './AdminEvent.jsx';
import AdminEventEditForm from './AdminEventEditForm.jsx';

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

const ScheduleHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  font-weight: bold;
`;

const ScheduleItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr;
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

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [showAdminEvent, setShowAdminEvent] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

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
      await axios.put(`http://localhost:4000/user-status-update/${userId}`, { status: newStatus });
      setUsers(users.map(user =>
        user._id === userId ? { ...user, userStatus: newStatus } : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      await axios.delete(`http://localhost:4000/userdeletion/${userId}`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditEvent = (event) => {
    setEventToEdit(event);
    setIsEditMode(true);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:4000/event-delete/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEventToEdit(null);
  };

  return (
    <Container>
      <Sidebar>
        <SidebarItem onClick={() => { setActiveTab('users'); setShowAdminEvent(false); setIsEditMode(false); }}>Users</SidebarItem>
        <SidebarItem onClick={() => { setActiveTab('events'); setShowAdminEvent(false); setIsEditMode(false); }}>Events</SidebarItem>
        <SidebarItem onClick={() => { setShowAdminEvent(true); setIsEditMode(false); }}>Create Event</SidebarItem>
      </Sidebar>
      <Main>
        <Header>
          <Title>Admin Dashboard</Title>
          {/* <span>April, 1 Friday</span> */}
        </Header>
        <Content>
          {showAdminEvent && <Adminevent />}
          {isEditMode && eventToEdit && (
            <AdminEventEditForm event={eventToEdit} onCancelEdit={handleCancelEdit} />
          )}
          {!showAdminEvent && !isEditMode && activeTab === 'users' && (
            <>
              <ScheduleHeader>
                <div>Username</div>
                <div>Phone Number</div>
                <div>Status</div>
                <div>Block</div>
                <div>Delete</div>
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
                    <ScheduleActions>
                    <ActionButton
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete User
                      </ActionButton>
                      </ScheduleActions>
                  </ScheduleItem>
                ))}
              </div>
            </>
          )}
          {!showAdminEvent && !isEditMode && activeTab === 'events' && (
            <>
              <ScheduleHeader>
                <div>Event Name</div>
                <div>Event Date</div>
                <div>Like Count</div>
                <div>Comments</div>
                <div>Edit</div>
                <div>Delete</div>
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
                    <ScheduleActions>
                      <ActionButton
                        onClick={() => handleEditEvent(event)}
                      >
                        Edit
                      </ActionButton>
                    </ScheduleActions>
                    <ScheduleActions>
                    <ActionButton
                        onClick={() => handleDeleteEvent(event._id)}
                      >
                        Delete
                      </ActionButton>
                      </ScheduleActions>
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
