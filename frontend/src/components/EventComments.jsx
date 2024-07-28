import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventComments = () => {
  const { eventId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!eventId) {
      console.error('Event ID is missing.');
      setError('Event ID is missing.');
      return;
    }

    // Fetch comments for the event
    console.log(`Fetching comments for event ID: ${eventId}`);
    axios.get(`http://localhost:4000/comments/${eventId}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setComments(response.data);
        } else {
          console.error('Unexpected response data:', response.data);
          setComments([]);
        }
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
        setError('Failed to load comments.');
      });
  }, [eventId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!userId) {
      setError('User ID is missing.');
      return;
    }

    // Post a new comment
    axios.put('http://localhost:4000/action/comment', {
      user_id: userId,
      event_id: eventId,
      comment: newComment
    })
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch(error => {
        console.error('Error posting comment:', error);
        setError('Failed to post comment.');
      });
  };

  return (
    <div>
      <h3>Comments</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.comment}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment"
          required
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
};

export default EventComments;
