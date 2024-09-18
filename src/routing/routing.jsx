import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/home';
import SingleBlog from '../pages/singleBlog/singleBlog';
import SignUpPage from '../pages/signup-page/signupPage';
import LoginPage from '../pages/login-page/loginPage';



const Routing = () => {
  return  (
    
      <Router>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>

  );
}

export default Routing