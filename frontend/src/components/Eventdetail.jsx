import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
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
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import './Eventdetail.css';

export default function Eventdetail({ events }) {
  const [liked, setLiked] = React.useState({});
  const [expandedCardIndex, setExpandedCardIndex] = React.useState(null);
  const [commentSectionIndex, setCommentSectionIndex] = React.useState(null);
  const [comments, setComments] = React.useState({});
  const [newComment, setNewComment] = React.useState('');
  const navigate = useNavigate();

  const handleChange = () => {
    window.location.href = '/details';
  };

  const handleLike = async (index) => {
    const isLiked = liked[index];
    const userId = 'user123';
    setLiked((prevLiked) => ({ ...prevLiked, [index]: !isLiked }));

    try {
      const eventId = cardData[index]._id.$oid;
      const url = `http://localhost:4000/events/${eventId}/likes`;
      await axios.post(url, { userId, action: isLiked ? 'unlike' : 'like' });

      setCardData((prevCardData) => {
        const newCardData = [...prevCardData];
        const likesCount = newCardData[index].likes.length;
        newCardData[index].likes = isLiked
          ? newCardData[index].likes.filter((like) => like !== userId)
          : [...newCardData[index].likes, userId];
        return newCardData;
      });

    } catch (error) {
      console.error('Error liking post', error);
    }
  };

  const handleExpand = (index) => {
    setExpandedCardIndex(index === expandedCardIndex ? null : index);
  };

  const handleCommentToggle = async (index) => {
    if (commentSectionIndex === index) {
      setCommentSectionIndex(null);
    } else {
      setCommentSectionIndex(index);
      if (!comments[index]) {
        try {
          const response = await axios.get(`http://localhost:4000/events`);
          console.log(response.data[index].comments);
          setComments((prevComments) => ({ ...prevComments, [index]: response.data }));
        } catch (error) {
          console.error('Error fetching comments', error);
        }
      }
    }
  };

  const handleAddComment = async (index) => {
    try {
      await axios.post(`http://localhost:4000/events/${events[index]._id}/comments`, { comment: newComment });
      setComments((prevComments) => ({
        ...prevComments,
        [index]: [...(prevComments[index] || []), newComment],
      }));
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment', error);
    }
  };

  return (
    <Box className="card-grid">
      {events.map((card, index) => (
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
                  src="https://via.placeholder.com/2000"
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
                        {card.eventName}
                      </Link>
                    </Typography>
                    <Typography level="body-sm">{card.eventDescription}</Typography>
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
                  <Typography level="body-xs" sx={{ ml: 1 }}>{card.likes}</Typography>
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
                    }}
                  >
                    <CommentIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto', marginTop: '10px' }}>
                  <Avatar variant="soft" color="neutral">
                    {card.eventName[0]} {/* Assuming avatar is the first letter of the event name */}
                  </Avatar>
                  <div>
                    <Typography level="body-xs">{card.eventOrganizer}</Typography>
                    <Typography level="body-sm">Learn More</Typography>
                  </div>
                </Box>
              </Box>
            </Box>
            <Box className="card-back">
              <Typography level="title-lg" sx={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px', color: 'white' }}>
                {card.eventName}
              </Typography>
              <Typography level="body-sm" sx={{ fontSize: '17px', fontWeight: 'normal', marginTop: '5px', color: 'white' }}>
                <span>Date: </span> {new Date(card.eventDate.$date).toLocaleDateString()}
              </Typography>
              <Typography level="body-sm" sx={{ fontSize: '17px', fontWeight: 'normal', marginTop: '5px', color: 'white' }}>
                <span>Start Time: </span> {new Date(card.eventStartTime.$date).toLocaleTimeString()}
              </Typography>
              <Typography level="body-sm" sx={{ fontSize: '17px', fontWeight: 'normal', marginTop: '5px', color: 'white' }}>
                <span>End Time: </span> {new Date(card.eventEndTime.$date).toLocaleTimeString()}
              </Typography>
              <Typography level="body-sm" sx={{ fontSize: '17px', fontWeight: 'normal', marginTop: '5px', color: 'white' }}>
                <span>Location: </span>{card.eventLocation}
              </Typography>
              <Typography level="body-sm" sx={{ fontSize: '17px', fontWeight: 'normal', marginTop: '5px', color: 'white' }}>
                <span>Organizer: </span>{card.eventOrganizer}
              </Typography>
              <Typography level="body-sm" sx={{ fontSize: '17px', fontWeight: 'normal', marginTop: '40px', color: 'white' }}>
                <button onClick={handleChange}><span>Know more..</span></button>
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


// import * as React from 'react';
// import AspectRatio from '@mui/joy/AspectRatio';
// import Avatar from '@mui/joy/Avatar';
// import Box from '@mui/joy/Box';
// import Card from '@mui/joy/Card';
// import IconButton from '@mui/joy/IconButton';
// import Typography from '@mui/joy/Typography';
// import Link from '@mui/joy/Link';
// import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import TextField from '@mui/joy/TextField';
// import Button from '@mui/joy/Button';
// import axios from 'axios';
// import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
// import './Eventdetail.css';

// export default function Eventdetail({ events }) {
//   const [liked, setLiked] = React.useState({});
//   const [expandedCardIndex, setExpandedCardIndex] = React.useState(null);
//   const [commentSectionIndex, setCommentSectionIndex] = React.useState(null);
//   const [comments, setComments] = React.useState({});
//   const [newComment, setNewComment] = React.useState('');
//   const [cardData, setCardData] = React.useState([]);

//   const handleChange=()=>{
//     window.location.href='/details'
//   }
  
//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/events');
//         setCardData(response.data);
//       } catch (error) {
//         console.error('Error fetching data', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleLike = async (index) => {
//     setLiked((prevLiked) => ({ ...prevLiked, [index]: !prevLiked[index] }));
//     const userId = 'user123';
//     try {
//       await axios.post('http://localhost:4000/events/like', { userId, eventId: cardData[index]._id });
//       const response = await axios.get('http://localhost:4000/events');
//       setCardData(response.data);
//     } catch (error) {
//       console.error('Error liking post', error);
//     }
//   };

//   const handleExpand = (index) => {
//     setExpandedCardIndex(index === expandedCardIndex ? null : index);
//   };

//   const handleCommentToggle = async (index) => {
//     if (commentSectionIndex === index) {
//       setCommentSectionIndex(null);
//     } else {
//       setCommentSectionIndex(index);
//       if (!comments[index]) {
//         try {
//           const response = await axios.get(`http://localhost:4000/events/${cardData[index]._id}/comments`);
//           setComments((prevComments) => ({ ...prevComments, [index]: response.data }));
//         } catch (error) {
//           console.error('Error fetching comments', error);
//         }
//       }
//     }
//   };

//   const handleAddComment = async (index) => {
//     try {
//       await axios.post(`http://localhost:4000/events/${cardData[index]._id}/comments`, { comment: newComment });
//       setComments((prevComments) => ({
//         ...prevComments,
//         [index]: [...(prevComments[index] || []), newComment],
//       }));
//       setNewComment('');
//     } catch (error) {
//       console.error('Error adding comment', error);
//     }
//   };

//   return (
//     <Box className="card-grid">
//       {cardData.map((card, index) => (
//         <Card
//           key={index}
//           variant="outlined"
//           className={`card ${expandedCardIndex === index ? 'flipped' : ''}`}
//           onClick={() => handleExpand(index)}
//         >
//           <Box className="card-inner">
//             <Box className="card-front">
//               <AspectRatio
//                 ratio="16/9"
//                 sx={{
//                   flexGrow: 1,
//                   '--AspectRatio-paddingBottom': '56.25%',
//                   overflow: 'hidden',
//                 }}
//               >
//                 <img
//                   src="https://via.placeholder.com/2000"
//                   alt={card.eventName}
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover',
//                   }}
//                 />
//               </AspectRatio>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   gap: 2,
//                   padding: '16px',
//                 }}
//               >
//                 <Box sx={{ display: 'flex', alignItems: 'center', }}>
//                   <div>
//                     <Typography level="title-lg">
//                       <Link
//                         href="#container-responsive"
//                         overlay
//                         underline="none"
//                         sx={{
//                           color: 'text.primary',
//                           '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
//                         }}
//                       >
//                         {card.eventName}
//                       </Link>
//                     </Typography>
//                     <Typography level="body-sm">{card.eventDescription}</Typography>
//                   </div>
//                   <IconButton
//                     size="small"
//                     variant="plain"
//                     color="neutral"
//                     sx={{
//                       ml: 'auto',
//                       alignSelf: 'flex-start',
//                       padding: 0,
//                       borderRadius: '50%',
//                       ':hover': {
//                         backgroundColor: 'transparent'
//                       },
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleLike(index);
//                     }}
//                   >
//                     {liked[index] ? <FavoriteIcon color="error" /> : <FavoriteBorderRoundedIcon />}
//                   </IconButton>
//                   <Typography level="body-xs" sx={{ ml: 1 }}>{card.likes}</Typography>
//                   <IconButton
//                     size="small"
//                     variant="plain"
//                     color="neutral"
//                     sx={{
//                       ml: 1,
//                       alignSelf: 'flex-start',
//                       padding: 0,
//                       borderRadius: '50%',
//                       ':hover': {
//                         backgroundColor: 'transparent'
//                       },
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleCommentToggle(index);
//                     }}
//                   >
//                     <CommentIcon />
//                   </IconButton>
//                 </Box>
//                 <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto',marginTop:'10px' }}>
//                   <Avatar variant="soft" color="neutral">
//                     {card.eventName[0]} {/* Assuming avatar is the first letter of the event name */}
//                   </Avatar>
//                   <div>
//                     <Typography level="body-xs">{card.eventOrganizer}</Typography>
//                     <Typography level="body-sm">Learn More</Typography>
//                   </div>
//                 </Box>
//               </Box>
//             </Box>
//             <Box className="card-back">
//               <Typography level="title-lg" sx={{ fontSize:'30px', fontWeight: 'bold',marginBottom:'20px',color:'white' }}>{card.eventName}</Typography>
//               <Typography level="body-sm" sx={{ fontSize:'17px', fontWeight: 'normal',marginTop:'5px',color:'white'  }}><span>Date: </span> {new Date(card.eventDate.$date).toLocaleDateString()}</Typography>
//               <Typography level="body-sm" sx={{ fontSize:'17px', fontWeight: 'normal' ,marginTop:'5px',color:'white' }}><span>Start Time: </span> {new Date(card.eventStartTime.$date).toLocaleTimeString()}</Typography>
//               <Typography level="body-sm" sx={{ fontSize:'17px', fontWeight: 'normal' ,marginTop:'5px',color:'white' }}><span>End Time: </span> {new Date(card.eventEndTime.$date).toLocaleTimeString()}</Typography>
//               <Typography level="body-sm" sx={{ fontSize:'17px', fontWeight: 'normal',marginTop:'5px',color:'white'  }}><span>Location: </span>{card.eventLocation}</Typography>
//               <Typography level="body-sm" sx={{ fontSize:'17px', fontWeight: 'normal' ,marginTop:'5px',color:'white' }}><span>Organizer: </span>{card.eventOrganizer}</Typography>
//               <Typography level="body-sm" sx={{ fontSize:'17px', fontWeight: 'normal' ,marginTop:'40px',color:'white' }}><button onClick={handleChange}><span>Know more..</span></button></Typography>
//             </Box>
//             {commentSectionIndex === index && (
//               <Box className="comments-section">
//                 <Typography level="title-lg">Comments</Typography>
//                 <Box sx={{ maxHeight: 300, overflowY: 'auto', mt: 2 }}>
//                   {comments[index]?.length > 0 ? comments[index].map((comment, i) => (
//                     <Typography key={i} sx={{ mt: 1 }}>
//                       {comment}
//                     </Typography>
//                   )) : (
//                     <Typography sx={{ mt: 1 }}>No comments yet</Typography>
//                   )}
//                 </Box>
//                 <TextField
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   placeholder="Add a comment"
//                   fullWidth
//                   sx={{ mt: 2 }}
//                 />
//                 <Button onClick={() => handleAddComment(index)} sx={{ mt: 1 }}>
//                   Comment
//                 </Button>
//               </Box>
//             )}
//           </Box>
//         </Card>
//       ))}
//     </Box>
//   );
// }
