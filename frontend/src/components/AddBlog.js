import React, { useState} from 'react';
import axios from 'axios';
import { Box, InputLabel, TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const labelStyles = { mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' };

function AddBlog() {
  const navigate=useNavigate()
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: " "
  });
  const userId = localStorage.getItem('userId');
  console.log(userId)
console.log('User ID:', userId);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/blogs/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem('userId'),
      }).catch(err=>console.log(err))

      const data = res?.data;

      return data;
    } catch (error) {
      console.error("Error sending request:", error);
      throw error;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => navigate('/blogslist'));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3}
          borderColor="linear-gradient(135deg, rgba(43,44,212,1) 0%, rgba(140,0,161,1) 38%, rgba(69,245,252,1) 99%)"
          borderRadius={10} boxShadow="10px 10x 20px #ccc"
          padding={3} margin={"auto"}
          marginTop={3} display="flex"
          flexDirection={'column'}
          width={"50%"}>
          <Typography fontWeight={'bold'}
            padding={3} color={'black'}
            variant="h4"
            textAlign="center">
            Post your Blogs
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name="title" value={inputs.title} onChange={handleChange} margin='auto' variant='outlined' />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField name="description" value={inputs.description} onChange={handleChange} margin='auto' variant='outlined' />
          <InputLabel sx={labelStyles}>Blog image</InputLabel>
          <TextField name="imageURL" value={inputs.imageURL} onChange={handleChange} margin='auto' variant='outlined' />
          <Button sx={{ mt: 2, borderRdius: 4 }} variant='contained' type="submit">Submit</Button>
        </Box>
      </form>
    </div>
  );
}

export default AddBlog;
