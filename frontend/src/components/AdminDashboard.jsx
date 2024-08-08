import React, { useState, useEffect } from 'react';
import styled,{keyframes} from 'styled-components';
import axios from 'axios';
import Adminevent from './Adminevent.jsx';
import AdminEventEditForm from './AdminEventEditForm.jsx';
import Modal from './Modal.jsx';
import logo from '../Images/p-logo.png';
import { Snackbar } from '@mui/material';


// const borderAnimation = keyframes`
//   0% {
//     border-right: 2px solid red;
//     border-left: 2px solid white;
//     border-top: 2px solid white;
//     border-bottom: 2px solid white;
//   }
//   25% {
//     border-right: 2px solid white;
//     border-left: 2px solid red;
//     border-top: 2px solid white;
//     border-bottom: 2px solid white;
//   }
//   50% {
//     border-right: 2px solid white;
//     border-left: 2px solid white;
//     border-top: 2px solid red;
//     border-bottom: 2px solid white;
//   }
//   75% {
//     border-right: 2px solid white;
//     border-left: 2px solid white;
//     border-top: 2px solid white;
//     border-bottom: 2px solid red;
//   }
//   100% {
//     border-right: 2px solid red;
//     border-left: 2px solid white;
//     border-top: 2px solid white;
//     border-bottom: 2px solid white;
//   }
// `;

const borderAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f0f2f5;
`;

const Sidebar = styled.div`
  width: 170px;
  padding-top: 100px;
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  background-color: #fff;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin: 5px 0;
  margin-right:20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background-color: #e9ecef;
    transform: translateX(10px);
  }

  ${props => props.active && `
    background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
    color: #fff;
    border-radius: 4px;
    transform: translateX(10px);
  `}
`;

const Main = styled.div`
  padding-top: 100px;
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
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  font-weight: bold;
  margin-bottom:10px;
`;

const ScheduleHeader_reg = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr 1fr;
  padding: 10px;
  background:  rgba(48, 46, 46, 1);
  border-radius: 5px;
  font-weight: bolder;
  color:white;
  height:50px;
  font-size:20px;
  margin-bottom:10px;
`;

const ScheduleItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
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

const ScheduleTitle_reg = styled.h3`
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

const Dropdown = styled.div`
  grid-column: span 7;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  z-index: 0;

  &:before {
    content: '';
    position: absolute;
    top: -2px;
    right: -2px;
    bottom: -2px;
    left: -2px;
    background: linear-gradient(90deg, rgba(255,0,0,0.5), rgba(255,165,0,0.5), rgba(255,0,0,0.5), rgba(255,165,0,0.5));
    background-size: 200% 200%;
    z-index: -1;
    border-radius: 5px;
    animation: ${borderAnimation} 5s linear infinite;
  }
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserItem = styled.div`
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [users, setUsers] = useState([]);
  const [registration, setRegistration] = useState([]);
  const [events, setEvents] = useState([]);
  const [showAdminEvent, setShowAdminEvent] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteType, setDeleteType] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState({});

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

  const handleCloseRegistration = async (eventId) => {
    try {
      const response = await axios.put(`http://localhost:4000/event-registration-status-change/${eventId}`);
  
      const updatedRegistration = response.data.registration;
  
      setEvents(
        events.map((event) =>
          event._id === eventId ? { ...event, registration: updatedRegistration } : event
        )
      );
  
      const eventsResponse = await axios.get('http://localhost:4000/events');
      setEvents(eventsResponse.data);
    } catch (error) {
      console.error('Error updating registration status:', error);
      setSnackbarMessage('Error updating registration status');
      setOpenSnackbar(true);
    }
  };

  const handleDeleteUser = async (userId) => {
    setDeleteType('user');
    setDeleteId(userId);
    setShowModal(true);
  };

  const handleEditEvent = (event) => {
    setEventToEdit(event);
    setIsEditMode(true);
  };

  const handleDeleteEvent = async (eventId) => {
    setDeleteType('event');
    setDeleteId(eventId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteType === 'user') {
        await axios.delete(`http://localhost:4000/userdeletion/${deleteId}`);
        setUsers(users.filter(user => user._id !== deleteId));
        setSnackbarMessage('User deleted successfully!');
      } else if (deleteType === 'event') {
        await axios.delete(`http://localhost:4000/event-delete/${deleteId}`);
        setEvents(events.filter(event => event._id !== deleteId));
        setSnackbarMessage('Event deleted successfully!');
      }
      setShowModal(false);
      setOpenSnackbar(true);
    } catch (error) {
      console.error(`Error deleting ${deleteType}:`, error);
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem('userName');
    if (user) {
      setLoggedIn(true);
      setUserName(user);
    }
  }, []);

  const handleLoginClick = () => {
    window.location.href='/login';
  };

  const route = () => {
    window.location.href='/home';
  }

  const handleLogoutClick = async () => {
    try {
      const user_id = sessionStorage.getItem('user_id');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('userPassword');
      setLoggedIn(false);
      setUserName('');
      window.location.reload();
      window.location.href='/home';
      await axios.put(`http://localhost:4000/logout/${user_id}`);
    } catch(error) {
      console.log(`Error logging out: `, error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEventToEdit(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const toggleDropdown = async (eventId) => {
    if (dropdownOpen === eventId) {
      setDropdownOpen('');
    } else {
      setDropdownOpen(eventId);
      if (!registeredUsers[eventId]) {
        try {
          const response = await axios.get(`http://localhost:4000/register-who/${eventId}`);
          setRegisteredUsers({ ...registeredUsers, [eventId]: response.data });
        } catch (error) {
          console.error('Error fetching registered users:', error);
        }
      }
    }
  };

  return (
    <Container>
      <div className="Event-navbar">
        <label onClick={route}>
          <img src={logo} alt="cannot be displayed" className="nav-logo" />
          <p>Gleve</p>
        </label>
        <div className="btn-area">
          {loggedIn ? (
            <>
              <div className='user-name-container'><span className="user-name">{userName}</span></div>
              <button onClick={handleLogoutClick}>Logout</button>
            </>
          ) : (
            <button onClick={handleLoginClick}>Login</button>
          )}
        </div>
      </div>
      <Sidebar>
        <SidebarItem active={activeTab === 'users'} onClick={() => { setActiveTab('users'); setShowAdminEvent(false); setIsEditMode(false); }}>Users</SidebarItem>
        <SidebarItem active={activeTab === 'events'} onClick={() => { setActiveTab('events'); setShowAdminEvent(false); setIsEditMode(false); }}>Events</SidebarItem>
        <SidebarItem active={showAdminEvent && activeTab === 'create-event'} onClick={() => { setActiveTab('create-event') ; setShowAdminEvent(true); setIsEditMode(false); }}>Create Event</SidebarItem>
      </Sidebar>
      <Main>
        <Header>
          <Title>Admin Dashboard</Title>
          <button className='reload-btn'>Refresh DB</button>
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
                <div>Email ID</div>
                <div>Status</div>
                <div>Block</div>
                <div>Delete</div>
              </ScheduleHeader>
              <div>
                {users.map((user) => (
                  <ScheduleItem key={user._id}>
                    <ScheduleTitle>{user.userName}</ScheduleTitle>
                    <ScheduleTime>{user.userEmail}</ScheduleTime>
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
                <div>Close Registration</div>
                <div>Registered Users</div>
              </ScheduleHeader>
              <div>
                {events.map((event) => (
                  <div key={event._id}>
                    <ScheduleItem>
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
                      <ScheduleActions>
                      <BlockButton
                        onClick={() => handleCloseRegistration(event._id, event.registration)}
                      >
                        {event.registration === 'open' ? 'Close Registration' : 'Open Registration'}
                      </BlockButton>
                    </ScheduleActions>
                      <ScheduleActions>
                        <ActionButton onClick={() => toggleDropdown(event._id)}>
                          {dropdownOpen === event._id ? 'Hide Users' : 'Show Users'}
                        </ActionButton>
                      </ScheduleActions>
                    </ScheduleItem>
                    {dropdownOpen === event._id && (
                      <Dropdown>
                        <ScheduleHeader_reg>{event.eventName} (Registered)</ScheduleHeader_reg>
                        <ScheduleHeader>
                          <div>Username</div>
                          <div>Email ID</div>
                          <div>Status</div>
                          <div>Block</div>
                          <div>Delete</div>
                        </ScheduleHeader>
                        <div>
                          <ScheduleItem>
                          {registeredUsers[event._id] ? (
                            registeredUsers[event._id].length > 0 ? (
                              registeredUsers[event._id].map((user) => (
                                <ScheduleTitle_reg key={user._id}>
                                  {user.userName}
                                </ScheduleTitle_reg>
                              ))
                            ) : (
                              <UserItem>No registered users</UserItem>
                            )
                          ) : (
                            <UserItem>Loading...</UserItem>
                          )}
                          </ScheduleItem>
                        </div>
                      </Dropdown>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          {showModal && (
            <Modal
              title={`Delete ${deleteType === 'user' ? 'User' : 'Event'}`}
              onConfirm={confirmDelete}
              onCancel={() => setShowModal(false)}
            />
          )}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
          />
        </Content>
      </Main>
    </Container>
  );
};

export default AdminDashboard;