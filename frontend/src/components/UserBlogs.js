import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Blog from '../components/Blog';


function UserBlogs() {
  const[user,setUser]=useState()
  const id=localStorage.getItem('userId');
  const sendRequest=async()=>{
    try{
    const res=await axios.get(`http://localhost:8000/api/blogs/user/${id}`).catch((err)=>console.log(err))
const data=await res.data;
return data;
  }catch(err){
console.log(err)
  }}

  useEffect(()=>{
    sendRequest().then((data)=>setUser(data.user))
  },[])
  return (
    <>
      {user  && user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
          id={blog._id}
          isUser={true}
            key={index}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
          />
        ))}</>
  )
}

export default UserBlogs