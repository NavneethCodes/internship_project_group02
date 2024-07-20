import React, { useState } from 'react';
import './FlexExpand.css';
import img1 from '../assets/01.webp'
import img2 from '../assets/02.jpg'
import img3 from '../assets/03.jpg'
import img4 from '../assets/04.jpg'
import img5 from '../assets/05.jpg'

const cards = [
  { img: img1, title: 'GTA 6' },
  { img: img2, title: 'Spider-Man PS5' },
  { img: img3, title: 'God Of War' },
  { img: img4, title: 'The Last of Us' },
  { img: img5, title: 'Elden Ring' }
];

const Card = ({ img, title, isActive, onClick }) => (
  <div className={`card ${isActive ? 'active' : ''}`} onClick={onClick}>
    <img className="background" src={img} alt={title} />
    <div className="card-content">
      <div className="profile-image">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-gamepad-2"
        >
          <line x1="6" x2="10" y1="11" y2="11" />
          <line x1="8" x2="8" y1="9" y2="13" />
          <line x1="15" x2="15.01" y1="12" y2="12" />
          <line x1="18" x2="18.01" y1="10" y2="10" />
          <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
        </svg>
      </div>
      <h3 className="title">{title}</h3>
    </div>
    <div className="backdrop"></div>
  </div>
);

const App = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="container">
      {cards.map((card, index) => (
        <Card
          key={index}
          img={card.img}
          title={card.title}
          isActive={activeIndex === index}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};

export default App;

