import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import BlogDetails from './pages/BlogDetails';
import Login from './pages/Login';
import Register from './pages/Register';

// admin routes
import Dashboard from './admin/Dashboard';
import Reports from './admin/Reports';
import Users from './admin/Users';
import Blogs from './admin/Blogs';
import Profile from './pages/Profile';

// auth imports
import jwt_decode from "jwt-decode";
import { serverUrl } from "./ServerUrl";

function MyRoutes() {
  const isAuthenticated = localStorage.getItem('authTokens') !== null;
  const [role, setRole] = useState([])

  // from the localstorage get the logged in user
  useEffect(() => {
    const accessToken = localStorage.getItem("authTokens");

    if (accessToken) {
      // get the access token
      const parsedTokens = JSON.parse(accessToken);

      if (parsedTokens) {
        // headers access token
      
        // decoding the token so that I can get the user id
        const decodedToken = jwt_decode(accessToken);
        const userId = decodedToken.userId;

        // hitting the endpoint of getting the user's details
        serverUrl.get(`/user/${userId}/`)
          .then((res) => {
            // get the role of the logged-in user
            setRole(res.data.role);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ?
          <>
            <Route exact path="/" Component={Home} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/register" Component={Register} />
            <Route exact path="/profile" Component={Profile} />
            <Route path="/blog/:id" Component={BlogDetails} />

            {/* admin routes */}
            {role === "Admin" ?
              <>
                <Route exact path="/dashboard" Component={Dashboard} />
                <Route exact path="/reports" Component={Reports} />
                <Route exact path="/users" Component={Users} />
                <Route exact path="/blogs" Component={Blogs} />
              </>
              :
              <></>}
          </>
          :
          <>
            <Route exact path="/" Component={Home} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/register" Component={Register} />
          </>
        }
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
