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
import axios from 'axios';
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import './Eventdetail.css';
import Modal from '@mui/material/Modal';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';

const cardData = [
  {
    title: 'WEDDING PLANAR',
    subtitle: 'Mark your calendars',
    avatar: 'A',
    avatarLabel: 'Welcome All',
    description: 'Learn More',
    imageUrl: 'https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000',
    likeCount: 0,
  },
  {
    title: 'EVENT ORGANIZER',
    subtitle: 'Join our events',
    avatar: 'E',
    avatarLabel: 'Explore Now',
    description: 'Learn More',
    imageUrl: 'https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000',
    likeCount: 0,
  },
  {
    title: 'CONCERT NIGHT',
    subtitle: 'Live music experience',
    avatar: 'C',
    avatarLabel: 'Don’t miss it',
    description: 'Learn More',
    imageUrl: 'https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000',
    likeCount: 0,
  },
  {
    title: 'ART EXHIBITION',
    subtitle: 'Discover new artists',
    avatar: 'A',
    avatarLabel: 'Art for everyone',
    description: 'Learn More',
    imageUrl: 'https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000',
    likeCount: 0,
  },
  {
    title: 'TECH CONFERENCE',
    subtitle: 'Innovations and trends',
    avatar: 'T',
    avatarLabel: 'Join the future',
    description: 'Learn More',
    imageUrl: 'https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000',
    likeCount: 0,
  },
  {
    title: 'FOOD FESTIVAL',
    subtitle: 'Taste the world',
    avatar: 'F',
    avatarLabel: 'Delicious moments',
    description: 'Learn More',
    imageUrl: 'https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000',
    likeCount: 0,
  },

];

export default function Eventdetail() {
  const [liked, setLiked] = React.useState({});
  const [expandedCardIndex, setExpandedCardIndex] = React.useState(null);
  const [commentsVisible, setCommentsVisible] = React.useState(false);
  const [currentCardIndex, setCurrentCardIndex] = React.useState(null);
  const [comments, setComments] = React.useState({});
  const [newComment, setNewComment] = React.useState('');
  const [commentsVisibleIndex, setCommentsVisibleIndex] = React.useState(null);

  const handleLike = async (index) => {
    setLiked((prevLiked) => {
      const newLiked = { ...prevLiked, [index]: !prevLiked[index] };
      return newLiked;
    });

    cardData[index].likeCount += liked[index] ? -1 : 1;

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

  const handleCommentToggle = (index) => {
    setCurrentCardIndex(index);
    setCommentsVisibleIndex(index === commentsVisibleIndex ? null : index);
  };

  const handleAddComment = () => {
    const updatedComments = {
      ...comments,
      [currentCardIndex]: [...(comments[currentCardIndex] || []), newComment],
    };
    setComments(updatedComments);
    setNewComment('');
  };

  return (
    <Box className="card-grid">
      {cardData.map((card, index) => (
        <Card
          key={index}
          variant="outlined"
          className={expandedCardIndex === index ? 'expanded' : ''}
          sx={{
            background: 'rgb(255, 255, 255,0.4)',
            backdropFilter: 'blur(100px)',
            border: '2px solid rgba(255,255,255,.2)',
            animation: 'slideDown 0.5s ease-out',
          }}
          onClick={() => handleExpand(index)}
        >
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    backgroundColor: 'transparent',
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(index);
                }}
              >
                {liked[index] ? <FavoriteIcon color="error" /> : <FavoriteBorderRoundedIcon />}
              </IconButton>
              <Typography variant="body2" sx={{ ml: 1, mt: 0.5 }}>
                {card.likeCount}
              </Typography>
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
                    backgroundColor: 'transparent',
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommentToggle(index);
                  setCommentsVisible(true);
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
        </Card>
      ))}
      <Modal
        open={commentsVisible}
        onClose={() => setCommentsVisible(false)}
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
            backgroundColor: 'lightblue',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comments
          </Typography>
          <Box sx={{ maxHeight: 300, overflowY: 'auto', mt: 2 }}>
            {comments[currentCardIndex]?.length > 0 ? comments[currentCardIndex].map((comment, index) => (
              <Typography key={index} sx={{ mt: 1 }}>
                {comment}
              </Typography>
            )) : (
              <Typography sx={{ mt: 1 }}>No comments yet</Typography>
            )}
          </Box>
          <ExampleTextareaComment 
            newComment={newComment} 
            setNewComment={setNewComment} 
            handleAddComment={handleAddComment}
          />
        </Box>
      </Modal>
    </Box>
  );
}

function ExampleTextareaComment({ newComment, setNewComment, handleAddComment }) {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <FormControl>
      <FormLabel>Your comment</FormLabel>
      <Textarea
        placeholder="Type something here…"
        minRows={3}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        endDecorator={
          <Box
            sx={{
              display: 'flex',
              gap: 'var(--Textarea-paddingBlock)',
              pt: 'var(--Textarea-paddingBlock)',
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto',
            }}
          >
            <IconButton
              variant="plain"
              color="neutral"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <FormatBold />
              <KeyboardArrowDown fontSize="md" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              size="sm"
              placement="bottom-start"
              sx={{ '--ListItemDecorator-size': '24px' }}
            >
              {['200', 'normal', 'bold'].map((weight) => (
                <MenuItem
                  key={weight}
                  selected={fontWeight === weight}
                  onClick={() => {
                    setFontWeight(weight);
                    setAnchorEl(null);
                  }}
                  sx={{ fontWeight: weight }}
                >
                  <ListItemDecorator>
                    {fontWeight === weight && <Check fontSize="sm" />}
                  </ListItemDecorator>
                  {weight === '200' ? 'lighter' : weight}
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              variant={italic ? 'soft' : 'plain'}
              color={italic ? 'primary' : 'neutral'}
              aria-pressed={italic}
              onClick={() => setItalic((bool) => !bool)}
            >
              <FormatItalic />
            </IconButton>
            <Button sx={{ ml: 'auto' }} onClick={handleAddComment}>
              Send
            </Button>
          </Box>
        }
        sx={{
          minWidth: 300,
          fontWeight,
          fontStyle: italic ? 'italic' : 'initial',
        }}
      />
    </FormControl>
  );
}

