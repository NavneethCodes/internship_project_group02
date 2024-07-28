import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EventComments.css';

const EventComments = () => {
  const { eventId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const [eventDetails, setEventDetails] = useState(null);
  const [userNames, setUserNames] = useState({});

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
        } else {
          console.error('Event not found:', eventId);
          setError('Event not found.');
        }
      })
      .catch(error => {
        console.error('Error fetching event data:', error);
        setError('Failed to load comments.');
      });
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

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError('Comment cannot be empty.');
      return;
    }

    try {
      const userId = await axios.get(`http://localhost:4000/profile`);
      console.log(userId,eventId, newComment);
      // await axios.post(`http://localhost:4000/action/comment`, { 
      //   userId,
      //   event_id: eventId,
      //   comment: newComment 
      // });

      const response = await axios.get(`http://localhost:4000/id/${userId}`);
      setComments([...comments, { user_id: userId, comment: newComment }]);
      setUserNames({ ...userNames, [userId]: response.data.userName });
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment', error);
      setError('Failed to post comment.');
    }
  };

  return (
    <div className="main-container">
      <div className="left-section">
        {eventDetails && (
          <>
            <img src={eventDetails.imgsrc || 'default-image-url'} alt="Event" className="event-image" />
            <div className="event-details">
              <h3>{eventDetails.eventName || 'Event Title'}</h3>
              <p>{eventDetails.eventDescription || 'Event Description'}</p>
              <p><strong>Date:</strong> {eventDetails.eventDate || 'Event Date'}</p>
              <p><strong>Location:</strong> {eventDetails.eventLocation || 'Event Location'}</p>
            </div>
          </>
        )}
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

