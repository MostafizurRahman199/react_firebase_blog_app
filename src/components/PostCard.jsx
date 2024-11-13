import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  CardActions, 
  Button,
  Avatar,
  Box,
  Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';

const PostCard = ({ post }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: 2,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)'
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={post.image || 'https://via.placeholder.com/400x200?text=No+Image'}
        alt={post.title}
        sx={{ 
          objectFit: 'cover',
          bgcolor: 'grey.100' 
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={post.category} 
            size="small" 
            color="primary" 
            sx={{ mb: 1 }}
          />
        </Box>
        
        <Typography gutterBottom variant="h6" component="h2" sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          minHeight: '3.6em'
        }}>
          {post.title}
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 2,
          gap: 1 
        }}>
          <AccountCircleIcon sx={{ width: 24, height: 24, color: 'grey.500' }} />
          <Typography variant="body2" color="text.secondary">
            {post.author}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
            {post.date}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          mb: 2
        }}>
          {post.content}
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          color: 'text.secondary'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <FavoriteIcon fontSize="small" />
            <Typography variant="body2">{post.likes}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <VisibilityIcon fontSize="small" />
            <Typography variant="body2">{post.views}</Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'end', px: 2, pb: 2 }}>
       
        <Button 
          size="small" 
          component={Link} 
          to={`/bookmarks/${post.id}`}
          variant="contained"
          color="primary"
        >
          See Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard; 