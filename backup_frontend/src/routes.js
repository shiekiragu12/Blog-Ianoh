import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Login from './pages/Login';
import Register from './pages/Register';

// admin routes
import Dashboard from './admin/Dashboard';

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/register" Component={Register} />
        <Route path="/blog/:id" Component={BlogDetails}/>

        {/* admin routes */}
        <Route exact path="/dashboard" Component={Dashboard} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
