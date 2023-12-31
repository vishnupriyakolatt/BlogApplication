import React, { useState } from 'react';
import { AppBar, Button, Toolbar, Typography, Box, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

function Header() {
  const dispatch=useDispatch()
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <>
      <AppBar position="sticky" sx={{ background: "#000" }}>
        <Toolbar>
          <Typography variant="h4">BlogApp</Typography>
             
          {isLoggedIn && (
             <Box display="flex" marginLeft='auto' marginRight='auto'>
            <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
              <Tab component={Link} to="/blogslist" label='All Blogs' />
              <Tab component={Link} to="/myBlogs" label='My Blogs' />
              <Tab component={Link} to="/blogslist/add" label='Add Blogs' />
            </Tabs>
          </Box>)}
          <Box display="flex" marginLeft="auto">
  {isLoggedIn ? (
    <>
      <Button onClick={() => dispatch(authActions.logout())} component={Link} to="/" variant="contained" sx={{ margin: 1, borderRadius: 10 }} color="warning">
        Logout
      </Button>
    </>
  ) : (
    <>
      <Button component={Link} to="/" variant="contained" sx={{ margin: 1, borderRadius: 10 }} color="warning">
        Login
      </Button>
      {/* <Button component={Link} to="/" variant="contained" sx={{ margin: 1, borderRadius: 10 }} color="warning">
        SignUp
      </Button> */}
    </>
  )}
</Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;


