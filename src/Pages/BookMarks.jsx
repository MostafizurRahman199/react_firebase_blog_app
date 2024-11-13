import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Container, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

// Assuming you have AuthContext
import { useFirebase } from '../context/Firebase';
import PostCard from '../components/PostCard';

const BookMarks = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, getBookmarkedPosts } = useFirebase();

  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      try {
        setError(null);
        const posts = await getBookmarkedPosts(user.uid);
        setBookmarkedPosts(posts);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        setError('Failed to load bookmarks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookmarkedPosts();
    } else {
      setLoading(false);
    }
  }, [user, getBookmarkedPosts]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: 4, 
          fontWeight: 'bold',
          color: 'primary.main' 
        }}
      >
        Your Bookmarks
      </Typography>

      {loading ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2,
          minHeight: '200px'
        }}>
          <CircularProgress size={40} color="primary" />
          <Typography variant="body1" color="text.secondary">
            Loading your bookmarks...
          </Typography>
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" sx={{ textAlign: 'center' }}>
          {error}
        </Typography>
      ) : bookmarkedPosts.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
          No bookmarked posts yet
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {bookmarkedPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BookMarks;