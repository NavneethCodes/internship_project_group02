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
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import axios from 'axios';
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import './Eventdetail.css';

export default function Eventdetail() {
  const [liked, setLiked] = React.useState({});
  const [expandedCardIndex, setExpandedCardIndex] = React.useState(null);
  const [commentSectionIndex, setCommentSectionIndex] = React.useState(null);
  const [comments, setComments] = React.useState({});
  const [newComment, setNewComment] = React.useState('');
  const [cardData, setCardData] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/events');
        setCardData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);
  const handleLike = async (index) => {
    const isLiked = liked[index];
    console.log(isLiked);
    setLiked((prevLiked) => ({ ...prevLiked, [index]: !isLiked }));

    try {
      const eventId = cardData[index]._id;
      const all_likes = cardData[index].likes;
      console.log("Liked people:- ", all_likes);
      const userId = sessionStorage.getItem("user_id");
      console.log("user_id:- ", userId, "\nevent_id:- ", eventId);
      await axios.put(`http://localhost:4000/action/${isLiked ? 'unlike' : 'like'}`, { user_id:userId, event_id:eventId});

      setCardData((prevCardData) => {
        const newCardData = [...prevCardData];
        newCardData[index].likes = isLiked
          ? newCardData[index].likes.filter((like) => like !== userId)
          : [...newCardData[index].likes, userId];
        return newCardData;
      });

    } catch (error) {
      console.error('Error updating like status', error);
    }
  };

  const handleExpand = (index) => {
    setExpandedCardIndex(index === expandedCardIndex ? null : index);
  };

  const handleCommentToggle = (index) => {
    if (cardData[index] && cardData[index]._id && cardData[index]._id) {
      const eventId = cardData[index]._id; // Extract the event ID
      navigate(`/comments/${eventId}`);
    } else {
      console.error('Event ID not found or invalid:', cardData[index]);
    }
  };

  const handleNavigateToDetails = (index) => {
    if (cardData[index] && cardData[index]._id && cardData[index]._id) {
      const eventId = cardData[index]._id;
      navigate(`/comments/${eventId}`);
    } else {
      console.error('Event ID not found or invalid:', cardData[index]);
    }
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
                  src={card.imgsrc}
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
                    <Typography level="body-sm" sx={{ color: 'black', marginTop: '20px' }}>{card.eventDescription}</Typography>
                  </div>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                  <Avatar variant="soft" color="black">
                    {card.eventName[0]} {/* Assuming avatar is the first letter of the event name */}
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
                    handleLike(index);
                  }}
                  sx={{
                    transition: 'all 0.3s ease-in-out',
                    ':hover': {
                      backgroundColor: 'transparent',
                      transform: 'scale(1.7)'
                    }
                  }}
                >
                  {liked[index] ? <FavoriteIcon color="error" /> : <FavoriteBorderRoundedIcon />}
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
              <Typography level="body-sm" sx={{ fontSize: '17px', fontWeight: 'normal', marginTop: '5px', color: 'white' }}><span>Date: </span> {new Date(card.eventDate.$date).toLocaleDateString()}</Typography>
              <Typography level="body-sm" sx={{ fontSize: '17px', fontWeight: 'normal', marginTop: '5px', color: 'white' }}><span>Start Time: </span> {new Date(card.eventStartTime.$date).toLocaleTimeString()}</Typography>
              <Typography level="body-sm" sx={{ fontSize: '17px', fontWeight: 'normal', marginTop: '5px', color: 'white' }}><span>End Time: </span> {new Date(card.eventEndTime.$date).toLocaleTimeString()}</Typography>
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
            {commentSectionIndex === index && (
              <Box className="comments-section">
                <Typography level="title-lg">Comments</Typography>
                <Box sx={{ maxHeight: 300, overflowY: 'auto', mt: 2 }}>
                  {comments[index]?.length > 0 ? comments[index].map((comment, i) => (
                    <Typography key={i} sx={{ mt: 1 }}>
                      {comment.comment}
                    </Typography>
                  )) : (
                    <Typography sx={{ mt: 1 }}>No comments yet</Typography>
                  )}
                </Box>
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment"
                  fullWidth
                  sx={{ mt: 2 }}
                />
                <Button onClick={() => handleAddComment(index)} sx={{ mt: 1 }}>
                  Comment
                </Button>
              </Box>
            )}
          </Box>
        </Card>
      ))}
    </Box>
  );
}
