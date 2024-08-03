import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import './Eventdetail.css';

export default function Eventdetail({ events }) {
  const [liked, setLiked] = React.useState({});
  const [expandedCardIndex, setExpandedCardIndex] = React.useState(null);
  const [cardData, setCardData] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const current_user = sessionStorage.getItem("user_id");
    const initialLiked = events.reduce((acc, card) => {
      acc[card._id] = card.likes.includes(current_user);
      return acc;
    }, {});
    setLiked(initialLiked);
    setCardData(events);
  }, [events]);

  const handleLike = async (eventId) => {
    const current_user = sessionStorage.getItem("user_id");

    if (!current_user) {
      navigate('/login');
      return;
    }

    const isLiked = liked[eventId];

    try {
      await axios.put(`http://localhost:4000/action/${isLiked ? 'unlike' : 'like'}`, { user_id: current_user, event_id: eventId });

      setCardData((prevCardData) => {
        return prevCardData.map(card => {
          if (card._id === eventId) {
            const updatedLikes = isLiked
              ? card.likes.filter(id => id !== current_user)
              : [...card.likes, current_user];
            return { ...card, likes: updatedLikes };
          }
          return card;
        });
      });

      setLiked((prevLiked) => ({ ...prevLiked, [eventId]: !isLiked }));

    } catch (error) {
      console.error('Error updating like status', error);
    }
  };

  const handleExpand = (index) => {
    setExpandedCardIndex(index === expandedCardIndex ? null : index);
  };

  const handleCommentToggle = (index) => {
    if (cardData[index] && cardData[index]._id) {
      const eventId = cardData[index]._id;
      navigate(`/comments/${eventId}`);
    } else {
      console.error('Event ID not found or invalid:', cardData[index]);
    }
  };

  const handleNavigateToDetails = (index) => {
    if (cardData[index] && cardData[index]._id) {
      const eventId = cardData[index]._id;
      navigate(`/comments/${eventId}`);
    } else {
      console.error('Event ID not found or invalid:', cardData[index]);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <Box className="card-grid">
      {cardData.map((card, index) => (
        <Card
          key={index}
          variant="outlined"
          className={`card ${expandedCardIndex === index ? 'flipped' : ''}`}
          onClick={() => handleExpand(index)}
          sx={{ borderRadius: '40px', background: 'rgb(246, 237, 237)', backdropFilter: 'blur(40px)', border: 'none' }}
        >
          <Box className="card-inner">
            <Box className="card-front">
              <AspectRatio
                ratio="16/9"
                sx={{
                  flexGrow: 1,
                  '--AspectRatio-paddingBottom': '56.25%',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={card.eventImg}
                  alt={card.eventName}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </AspectRatio>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  padding: '16px',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                  <div>
                    <Typography level="title-lg" >
                      <Link
                        href="#container-responsive"
                        overlay
                        underline="none"
                        sx={{
                          color: 'text.primary',
                          '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                        }}
                      >
                        {card.eventName}
                      </Link>
                    </Typography>
                    <Typography level="body-sm" sx={{ color: 'black', marginTop: '20px' }}>
                      {truncateText(card.eventDescription, 40)}
                    </Typography>
                  </div>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                  <Avatar variant="soft" color="black">
                    {card.eventName[0]}
                  </Avatar>
                  <div>
                    <Typography level="body-xs" sx={{ color: 'black', marginTop: '10px' }}>{card.eventOrganizer}</Typography>
                  </div>
                </Box>
              </Box>
              <Box sx={{ position: 'absolute', bottom: -20, right: 16, display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  variant="plain"
                  color="neutral"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(card._id);
                  }}
                  sx={{
                    transition: 'all 0.3s ease-in-out',
                    ':hover': {
                      backgroundColor: 'transparent',
                      transform: 'scale(1.5)'
                    }
                  }}
                >
                  {liked[card._id] ? <FavoriteIcon color="error" /> : <FavoriteBorderRoundedIcon />}
                </IconButton>
                <Typography level="body-xs" sx={{ ml: 1 }}>{card.likes.length}</Typography>
                <IconButton
                  size="small"
                  variant="plain"
                  color="neutral"
                  sx={{
                    ml: 1,
                    alignSelf: 'flex-start',
                    padding: 0,
                    borderRadius: '50%',
                    ':hover': {
                      backgroundColor: 'transparent'
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCommentToggle(index);
                  }}
                >
                  <CommentIcon />
                </IconButton>
              </Box>
            </Box>
            <Box className="card-back">
              <Typography level="title-lg" sx={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px', color: 'white' }}>{card.eventName}</Typography>
              <Typography level="body-sm" sx={{ fontSize: '17px', fontWeight: 'normal', marginTop: '5px', color: 'white' }}><span>Date: </span> {new Date(card.eventDate).toLocaleDateString()}</Typography>
              <Typography level="body-sm" sx={{ fontSize: '17px', fontWeight: 'normal', marginTop: '5px', color: 'white' }}><span>Start Time: </span> {new Date(card.eventStartTime).toLocaleTimeString()}</Typography>
              <Typography level="body-sm" sx={{ fontSize: '17px', fontWeight: 'normal', marginTop: '5px', color: 'white' }}><span>End Time: </span> {new Date(card.eventEndTime).toLocaleTimeString()}</Typography>
              <Typography level="body-sm" sx={{ fontSize: '17px', fontWeight: 'normal', marginTop: '5px', color: 'white' }}><span>Location: </span>{card.eventLocation}</Typography>
              <Typography level="body-sm" sx={{ fontSize: '17px', fontWeight: 'normal', marginTop: '5px', color: 'white' }}><span>Organizer: </span>{card.eventOrganizer}</Typography>
              <Typography level="body-sm" sx={{ fontSize: '17px', fontWeight: 'normal', marginTop: '40px', color: 'white' }}>
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleNavigateToDetails(index);
                }}>
                  <span>Know more..</span>
                </button>
              </Typography>
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
