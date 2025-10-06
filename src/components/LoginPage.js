import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'citizen'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
    
    // Store user type in localStorage for authentication
    localStorage.setItem('userType', formData.userType);
    localStorage.setItem('isAuthenticated', 'true');
    
    // Handle login logic here
    if (formData.userType === 'responder') {
      // Redirect to responder dashboard
      window.location.href = '/dashboard';
    } else {
      // Redirect to home page for citizens
      window.location.href = '/';
    }
  };

  return (
    <div className="login-page">
      <div className="page-header">
        <h1>Welcome Back</h1>
        <p>Sign in to your ResQNow account</p>
      </div>
      
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userType">I am a *</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              required
            >
              <option value="citizen">Citizen</option>
              <option value="responder">Emergency Responder</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="login-btn">Sign In</button>
          
          <div className="signup-link">
            <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
