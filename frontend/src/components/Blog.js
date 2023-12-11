import React,{useState} from 'react';
import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography, Box } from '@mui/material';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Blog({ title, description, imageURL, userName, isUser, id }) {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/blogs//delete/${id}`);
      const data = res.data;
      console.log('Response from backend:', data);
      return data;
    } catch (error) {
      console.error('Error deleting blog:', error.message);
      return null;
    }
  };
  
  const handleDelete = () => {
    deleteRequest()
      .then((data) => {
        console.log('Deletion successful:', data);
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        navigate('/blogslist');
      })
      .catch((err) => {
        console.error('Error deleting blog:', err);
      });
  };
  
  
  

  return (
    <Card sx={{ width: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc', ':hover:': { boxShadow: '10px 10px 20px #ccc' } }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">{userName}</Avatar>}
        title={title}
      />

      {isUser && (
        <Box display="flex">
          <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
            <FaPencilAlt sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={handleDelete} >
            <FaRegTrashAlt sx={{ fontSize: 20, justifyContent: 'flex-end' }} />
          </IconButton>
        </Box>
      )}

      <CardMedia component="img" height="194" image={imageURL} alt="Blog Post" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b>{userName}</b>: {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Blog;
