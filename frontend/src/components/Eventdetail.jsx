import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import './Eventdetail.css';

const cardData = [
  {
    title: 'WEDDING PLANNER',
    subtitle: 'Mark your calendars',
    avatar: 'A',
    avatarLabel: 'Welcome All',
    description: 'Learn More',
    imageUrl: 'https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000',
    venue: 'Grand Ballroom',
    time: '5:00 PM',
    location: '123 Wedding Lane, City',
    organizer: 'ABC Weddings',
  },
  {
    title: 'EVENT ORGANIZER',
    subtitle: 'Join our events',
    avatar: 'E',
    avatarLabel: 'Explore Now',
    description: 'Learn More',
    imageUrl: 'https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000',
    venue: 'Convention Center',
    time: '10:00 AM',
    location: '456 Event Blvd, City',
    organizer: 'XYZ Events',
  },
  {
    title: 'CONCERT NIGHT',
    subtitle: 'Live music experience',
    avatar: 'C',
    avatarLabel: 'Don’t miss it',
    description: 'Learn More',
    imageUrl: 'https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000',
    venue: 'City Arena',
    time: '8:00 PM',
    location: '789 Music Ave, City',
    organizer: 'Live Music Inc.',
  },
  {
    title: 'ART EXHIBITION',
    subtitle: 'Discover new artists',
    avatar: 'A',
    avatarLabel: 'Art for everyone',
    description: 'Learn More',
    imageUrl: 'https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000',
    venue: 'Art Gallery',
    time: '11:00 AM',
    location: '101 Art St, City',
    organizer: 'Creative Arts',
  },
  {
    title: 'TECH CONFERENCE',
    subtitle: 'Innovations and trends',
    avatar: 'T',
    avatarLabel: 'Join the future',
    description: 'Learn More',
    imageUrl: 'https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000',
    venue: 'Tech Hub',
    time: '9:00 AM',
    location: '202 Tech Way, City',
    organizer: 'Tech Innovators',
  },
  {
    title: 'FOOD FESTIVAL',
    subtitle: 'Taste the world',
    avatar: 'F',
    avatarLabel: 'Delicious moments',
    description: 'Learn More',
    imageUrl: 'https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000',
    venue: 'Food Park',
    time: '12:00 PM',
    location: '303 Food Ln, City',
    organizer: 'Gourmet Delights',
  },
];

export default function Eventdetail() {
  const [liked, setLiked] = React.useState({});
  const [expandedCardIndex, setExpandedCardIndex] = React.useState(null);
  const [commentsVisible, setCommentsVisible] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState('');

  const handleLike = async (index) => {
    setLiked((prevLiked) => ({ ...prevLiked, [index]: !prevLiked[index] }));
    const userId = 'user123';
    try {
      await axios.post('/api/like', { userId });
    } catch (error) {
      console.error('Error liking post', error);
    }
  };

  const handleExpand = (index) => {
    setExpandedCardIndex(index === expandedCardIndex ? null : index);
  };

  const handleCommentToggle = () => {
    setCommentsVisible(!commentsVisible);
  };

  const handleAddComment = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <Box className="card-grid">
      {cardData.map((card, index) => (
        <Card
          key={index}
          variant="outlined"
          className={`card ${expandedCardIndex === index ? 'flipped' : ''}`}
          onClick={() => handleExpand(index)}
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
                  src={card.imageUrl}
                  alt={card.title}
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
                    <Typography level="title-lg">
                      <Link
                        href="#container-responsive"
                        overlay
                        underline="none"
                        sx={{
                          color: 'text.primary',
                          '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                        }}
                      >
                        {card.title}
                      </Link>
                    </Typography>
                    <Typography level="body-sm">{card.subtitle}</Typography>
                  </div>
                  <IconButton
                    size="small"
                    variant="plain"
                    color="neutral"
                    sx={{
                      ml: 'auto',
                      alignSelf: 'flex-start',
                      padding: 0,
                      borderRadius: '50%',
                      ':hover': {
                        backgroundColor: 'transparent'
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(index);
                    }}
                  >
                    {liked[index] ? <FavoriteIcon color="error" /> : <FavoriteBorderRoundedIcon />}
                  </IconButton>
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
                      handleCommentToggle();
                    }}
                  >
                    <CommentIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                  <Avatar variant="soft" color="neutral">
                    {card.avatar}
                  </Avatar>
                  <div>
                    <Typography level="body-xs">{card.avatarLabel}</Typography>
                    <Typography level="body-sm">{card.description}</Typography>
                  </div>
                </Box>
              </Box>
            </Box>
            <Box className="card-back">
              <Typography level="title-lg">{card.title}</Typography>
              <Typography level="body-sm">Venue: {card.venue}</Typography>
              <Typography level="body-sm">Time: {card.time}</Typography>
              <Typography level="body-sm">Location: {card.location}</Typography>
              <Typography level="body-sm">Organizer: {card.organizer}</Typography>
            </Box>
          </Box>
        </Card>
      ))}
      <Modal
        open={commentsVisible}
        onClose={handleCommentToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comments
          </Typography>
          <Box sx={{ maxHeight: 300, overflowY: 'auto', mt: 2 }}>
            {comments.length > 0 ? comments.map((comment, index) => (
              <Typography key={index} sx={{ mt: 1 }}>
                {comment}
              </Typography>
            )) : (
              <Typography sx={{ mt: 1 }}>No comments yet</Typography>
            )}
          </Box>
          <TextField
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button onClick={handleAddComment} sx={{ mt: 1 }}>
            Comment
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
