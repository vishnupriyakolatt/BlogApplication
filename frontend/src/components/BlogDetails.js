import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, InputLabel, TextField, Typography, Button } from '@mui/material';

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' };

function BlogDetails() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;


  const [inputs, setInputs] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/blogs/${id}`);
      console.log('Response:', res); 
      const data = res.data;
  
      if (!data || !data.blog) {
        throw new Error('Blog data not available');
      }
  
      return data;
    } catch (error) {
      console.error('Error fetching details:', error.message);
      return null;
    }
  };
  
  
  useEffect(() => {
    fetchDetails().then((data) => {
      if (data && data.blog) {
        setBlog(data.blog);
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
        });
      } else {
   
        console.error('Invalid blog data:', data);
      }
    });
  }, [id]);
  
  

  const sendRequest = async () => {
    try {
      const res = await axios.put(`http://localhost:8000/api/blogs/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      });
      const data =await  res.data;
      return data;
    } catch (error) {
      console.error('Error updating blog:', error);
      return null;
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => {
      console.log(data); 
      navigate("/myBlogs/");
    }).catch((err) => console.log(err));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(135deg, rgba(43,44,212,1) 0%, rgba(140,0,161,1) 38%, rgba(69,245,252,1) 99%)"
            borderRadius={10}
            boxShadow="10px 10x 20px #ccc"
            padding={3}
            margin="auto"
            marginTop={3}
            display="flex"
            flexDirection={'column'}
            width={'80%'}
          >
            <Typography fontWeight={'bold'} padding={3} color={'black'} variant="h1" textAlign="center">
           Update your Blogs
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField name="title" value={inputs.title} onChange={handleChange} margin='auto' variant='outlined' />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField name="description" value={inputs.description} onChange={handleChange} margin='auto' variant='outlined' />

            <Button sx={{ mt: 2, borderRdius: 4 }} variant='contained' type="submit">
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
}

export default BlogDetails;
