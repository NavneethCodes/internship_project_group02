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

export default function ContainerResponsive() {
  const [liked, setLiked] = React.useState(false);
  const [commentsVisible, setCommentsVisible] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState('');

  const handleLike = async () => {
    setLiked(!liked); 
    const userId = 'user123';
    try {
      await axios.post('/api/like', { userId });
    } catch (error) {
      console.error('Error liking post', error);
    }
  };

  const handleCommentToggle = () => {
    setCommentsVisible(!commentsVisible);
  };

  const handleAddComment = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <Box sx={{ minHeight: 350 }}>
      <Card
        variant="outlined"
        sx={(theme) => ({
          width: 300,
          gridColumn: 'span 2',
          flexDirection: 'row',
          flexWrap: 'wrap',
          resize: 'horizontal',
          overflow: 'hidden',
          gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
          transition: 'transform 0.3s, border 0.3s',
          '&:hover': {
            borderColor: theme.vars.palette.primary.outlinedHoverBorder,
            transform: 'translateY(-2px)',
          },
          '& > *': { minWidth: 'clamp(0px, (360px - 100%) * 999,100%)' },
        })}
      >
        <AspectRatio
          variant="soft"
          sx={{
            flexGrow: 1,
            display: 'contents',
            '--AspectRatio-paddingBottom':
              'clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: 200,
          }}
        >
          <Box sx={{ display: 'flex' }}>
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
                  WEDDING PLANAR
                </Link>
              </Typography>
              <Typography level="body-sm">Mark your calendars</Typography>
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
              onClick={handleLike}
            >
              {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderRoundedIcon />}
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
              onClick={handleCommentToggle}
            >
              <CommentIcon />
            </IconButton>
          </Box>
          <AspectRatio
            variant="soft"
            sx={{
              '--AspectRatio-paddingBottom':
                'clamp(0px, (100% - 200px) * 999, 200px)',
              pointerEvents: 'none',
            }}
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2262"
            />
          </AspectRatio>
          <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
            <Avatar variant="soft" color="neutral">
              A
            </Avatar>
            <div>
              <Typography level="body-xs">Welcome All</Typography>
              <Typography level="body-sm">Learn More</Typography>
            </div>
          </Box>
        </Box>
      </Card>

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
