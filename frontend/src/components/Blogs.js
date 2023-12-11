import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from '../components/Blog'

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const sendRequest = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/blogs');
      const data =await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
 sendRequest().then((data)=>setBlogs(data.blogs))
  }, []);
  console.log(blogs)
  

  return (
    <>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
          id={blog._id}
            key={index}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
          />
        ))}
    </>
  );
  
}

export default Blogs;
