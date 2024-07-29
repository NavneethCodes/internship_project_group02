import React, { useState, useEffect } from 'react';
import Eventdetail from './Eventdetail';
import Sidebarr from './Sidebarr';
import './MainEventDisplay.css';
import logo from '../Images/p-logo.png';
import top1 from '../Images/top-5.jpeg';
import top2 from '../Images/top-4.jpeg';
import axios from 'axios';

const MainEventDisplay = () => {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/all-categories');
        console.log('Fetched Categories:', response.data.categories);
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/events');
        console.log('Fetched Events:', response.data);
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => event.eventCategory === selectedCategory);
      console.log(`Filtered Events (${selectedCategory}):`, filtered);
      setFilteredEvents(filtered);
    }
  }, [selectedCategory, events]);

  useEffect(() => {
    const user = sessionStorage.getItem('userName');
    const username = sessionStorage.getItem('userName');
    if (user && username) {
      setLoggedIn(true);
      setUserName(username);
    }
  }, []);

  const handleCategoryClick = (category) => {
    console.log('Selected Category:', category);
    setSelectedCategory(category);
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('user_id');
    setLoggedIn(false);
    setUserName('');
    window.location.reload();
  };

  return (
    <div className="Event-bg">
      <Sidebarr />
      <div className="Event-navbar">
        <label>
          <img src={logo} alt="cannot be displayed" className="nav-logo" />
          <p>Gleve</p>
        </label>
        <input type='text' placeholder="search" name="eventName" />
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
      <div className="top-design">
        <div className="para">
          <p className="td-txt">Discover, Track, and Experience Global Events.</p>
        </div>
        <div className="inside-top-design-2">
          <p className="td-txt-description">
            "Stay informed and engaged with the world's most exciting events. Explore upcoming concerts, festivals, conferences, and sports matches happening globally. Track your favorite events, receive real-time updates, and immerse yourself in unforgettable experiences. Join us to connect with a vibrant community of event enthusiasts and never miss out on the action!"
          </p>
        </div>
        <div className='inside-top-design'>
          <div className='itd-1'>
            <img src={top1} alt="cannot be load" className="top-1-img" />
            <label className="top1-txt">Events all over from globe at one place.</label>
          </div>
          <div className='itd-2'>
            <img src={top2} alt="cannot be load" className="top-2-img" />
            <label className="top2-txt">World's no:1 Event Manager platform that stands out everywhere.</label>
          </div>
        </div>
      </div>
      <h2 className="event-details-heading">Event Details</h2>
      <div className="Event-categories">
        <h2>Categories</h2>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${selectedCategory === category ? 'selected' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="Event-display-container">
        <Eventdetail events={filteredEvents} />
      </div>
    </div>
  );
};

export default MainEventDisplay;
