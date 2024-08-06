import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@mui/joy/IconButton';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import logo from '../Images/p-logo.png';
import './EventComments.css';
import Sidebarr from './Sidebarr'

const EventComments = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [eventDetails, setEventDetails] = useState(null);
  const [userNames, setUserNames] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!eventId) {
      console.error('Event ID is missing.');
      setError('Event ID is missing.');
      return;
    }

    // Fetch event data and extract comments
    axios.get(`http://localhost:4000/events`)
      .then(response => {
        const event = response.data.find(event => event._id === eventId);
        if (event) {
          setComments(event.comments || []);
          setEventDetails(event);
          fetchUserNames(event.comments);
          setLiked(event.likes.includes(sessionStorage.getItem("user_id")));
          setLikesCount(event.likes.length);
        } else {
          console.error('Event not found:', eventId);
          setError('Event not found.');
        }
      })
      .catch(error => {
        console.error('Error fetching event data:', error);
        setError('Failed to load comments.');
      });

    // Check registration status
    checkRegistrationStatus();

    // Check if user is logged in
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      axios.get(`http://localhost:4000/id/${userId}`)
        .then(response => {
          setLoggedIn(true);
          setUserName(response.data.userName);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [eventId]);

  const fetchUserNames = async (comments) => {
    const userIds = [...new Set(comments.map(comment => comment.user_id))];
    const userNamesTemp = {};

    await Promise.all(userIds.map(async userId => {
      try {
        const response = await axios.get(`http://localhost:4000/id/${userId}`);
        userNamesTemp[userId] = response.data.userName;
      } catch (error) {
        console.log('Error fetching username', error);
        userNamesTemp[userId] = 'Unknown User';
      }
    }));

    setUserNames(userNamesTemp);
  };

  const checkRegistrationStatus = async () => {
    try {
      const userId = sessionStorage.getItem('user_id');
      const response = await axios.get(`http://localhost:4000/user-info/${userId}`);
      const isUserRegistered = response.data.registered_events.includes(eventId);
      setIsRegistered(isUserRegistered);
    } catch (error) {
      console.error('Error checking registration status:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError('Comment cannot be empty.');
      return;
    }

    try {
      const userId = sessionStorage.getItem('user_id');
      console.log(userId, eventId, newComment);
      if (userId) {
        await axios.put(`http://localhost:4000/action/comment`, {
          "user_id": userId,
          "event_id": eventId,
          "comment": newComment
        });
      }

      const response = await axios.get(`http://localhost:4000/id/${userId}`);
      setComments([...comments, { user_id: userId, comment: newComment }]);
      setUserNames({ ...userNames, [userId]: response.data.userName });
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment', error);
      setError('Failed to post comment.');
    }
  };

  const handleRegistration = async () => {
    try {
      const userId = sessionStorage.getItem('user_id');
      const userResponse = await axios.get(`http://localhost:4000/user-info/${userId}`);

      const isUserRegistered = userResponse.data.registered_events.includes(eventId);
      const choice = isUserRegistered ? "1" : "0"; // 0 = register, 1 = unregister
      const response = await axios.put(`http://localhost:4000/${choice}/${userResponse.data._id}/${eventId}`);

      if (response.status === 200) {
        setIsRegistered(!isUserRegistered);
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating registration status:', error);
      setError('Failed to update registration status.');
    }
  };

  const handleLike = async () => {
    const current_user = sessionStorage.getItem("user_id");

    if (!current_user) {
      navigate('/login');
      return;
    }

    const isLiked = liked;

    try {
      await axios.put(`http://localhost:4000/action/${isLiked ? 'unlike' : 'like'}`, { user_id: current_user, event_id: eventId });

      setLiked(!isLiked);
      setLikesCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
    } catch (error) {
      console.error('Error updating like status', error);
    }
  };

  const route =() =>{
    window.location.href='/home';
  }

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = async () => {
    try {
      const user_id = sessionStorage.getItem('user_id');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('userPassword');
      setLoggedIn(false);
      setUserName('');
      window.location.reload();
      await axios.put(`http://localhost:4000/logout/${user_id}`);      
    } catch(error) {
      console.log(`Error logging out: `, error);
    }
  };

  return (
    <div className="main-container">
      {loggedIn ? <Sidebarr /> : <div className="disabled-sidebar"><Sidebarr /></div>}
      <div className="Event-navbar">
        <label onClick={route}>
          <img src={logo} alt="cannot be displayed" className="nav-logo" />
          <p>Gleve</p>
        </label>
        {/* <input type="text" placeholder="search" name="eventName" /> */}
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
      <div className="left-section">
        {eventDetails && (
          <>
            <div className="event-image-container">
              <img src={eventDetails.eventImg || 'default-image-url'} alt="Event" className="event-image" />
              <div className="like-button-container">
                <IconButton
                  size="small"
                  variant="plain"
                  color="neutral"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                  sx={{
                    transition: 'all 0.3s ease-in-out',
                    ':hover': {
                      backgroundColor: 'transparent',
                      transform: 'scale(1.5)'
                    }
                  }}
                >
                  {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderRoundedIcon />}
                </IconButton>
                <span>{likesCount}</span>
              </div>
            </div>
            <div className="event-details">
              <h3>{eventDetails.eventName || 'Event Title'}</h3>
              <div className="event-detail-item">
                <span className="event-detail-icon">📍 Location :</span>
                <span>{eventDetails.eventLocation || 'Event Location'}</span>
              </div>
              <div className="event-detail-item">
                <span className="event-detail-icon">📅 Date :</span>
                <span>{new Date(new Date(eventDetails.eventStartTime).toLocaleDateString()).toLocaleDateString() || 'Event Date'}</span>
              </div>
              <div className="event-detail-item">
                <span className="event-detail-icon">🕙 Starting Time :</span>
                <span>{new Date(eventDetails.eventStartTime).toLocaleTimeString() || 'Event Starting Time'}</span>
              </div>
              <div className="event-detail-item">
                <span className="event-detail-icon">🕗 Ending Time :</span>
                <span>{new Date(eventDetails.eventEndTime).toLocaleTimeString() || 'Event Ending Time'}</span>
              </div>
              <div className="event-detail-item">
                <span className="event-detail-icon">👤 Organizer :</span>
                <span>{eventDetails.eventOrganizer || 'Event Organizer'}</span>
              </div>
              <div className="event-detail-descrp">
                <span className="event-detail-icon">📝 Description :</span>
                <span>{eventDetails.eventDescription || 'Event Description'}</span>
              </div>
            </div>
          </>
        )}
        <button
          className={`register-button ${isRegistered ? 'unregister' : ''}`}
          onClick={handleRegistration}
        >
          {isRegistered ? 'Unregister' : 'Register Now'}
        </button>
      </div>
      <div className="right-section comment-bg">
        <div className="comment-area">
          <h3 className="comment-head">Comments</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="comment-input-box">
            <form onSubmit={handleAddComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add your comment"
                required
              />
              <button type="submit">Comment</button>
            </form>
          </div>
          {comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            <ul className="comment-list">
              {comments.map((comment, index) => (
                <li key={index}>
                  <div className="avatar"></div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="username">{userNames[comment.user_id] || 'Unknown User'}</span>
                      <span className="time">1h ago</span>
                    </div>
                    <div className="comment-text">{comment.comment}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventComments;
