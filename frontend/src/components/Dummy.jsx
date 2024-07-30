import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dummy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Dummy = () => {
  const [items, setItems] = useState([]);
  const routing = () =>{
    window.location.href='/maineventdetails'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/events');
        const formattedItems = response.data.map(item => ({
          id: item._id,
          name: item.eventName,
          description: item.eventDescription,
          backgroundImage: item.imgsrc,
        }));
        setItems(formattedItems);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems.push(updatedItems.shift());
      return updatedItems;
    });
  };

  const prevSlide = () => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems.unshift(updatedItems.pop());
      return updatedItems;
    });
  };

  return (
    <div className="unique-container">
      <div className="unique-slide">
        {items.map((item, index) => (
          <div
            className={`unique-item ${index === 1 ? 'active' : ''}`}
            key={item.id}
            style={{ backgroundImage: `url(${item.backgroundImage})` }}
          >
            {index === 1 && (
              <div className="unique-content">
                <div className="unique-name">{item.name}</div>
                <div className="unique-des">{item.description}</div>
                <button onClick={routing}>See More</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="unique-button">
        <button className="prev" onClick={prevSlide}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <button className="next" onClick={nextSlide}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
    </div>
  );
};

export default Dummy;
