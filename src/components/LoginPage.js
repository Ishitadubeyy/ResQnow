import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaUserShield, FaSignInAlt } from "react-icons/fa";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "citizen",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Password Validation Rule
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()_+=<>/\\|{}[\]-]).{6,}$/;

    if (!passwordRegex.test(formData.password)) {
      alert(
        "Password must be at least 6 characters long and include:\n• At least one letter\n• At least one number\n• At least one special character"
      );
      return;
    }

    setLoading(true);

    try {
      const endpoint = `http://localhost:5000/api/${formData.userType}s/login`;
      const response = await axios.post(endpoint, {
        email: formData.email,
        password: formData.password,
      });

      // Save Login Session
      localStorage.setItem("userType", formData.userType);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userData", JSON.stringify(response.data));

      // Redirect by User Type
      window.location.href =
        formData.userType === "responder" ? "/dashboard" : "/";
    } catch (error) {
      let errMsg = "Login failed. Please try again.";

      if (error.response?.data?.message) {
        errMsg = error.response.data.message;
      } else if (error.message === "Network Error") {
        errMsg = "Cannot connect to backend. Please check your server.";
      }

      alert(errMsg);
    } finally {
      setLoading(false);
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
            <label htmlFor="userType">
              <FaUserShield className="form-icon" /> I am a *
            </label>
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
            <label htmlFor="email">
              <FaUser className="form-icon" /> Email Address *
            </label>
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
            <label htmlFor="password">
              <FaLock className="form-icon" /> Password *
            </label>
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

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <span>Signing In...</span>
            ) : (
              <>
                <FaSignInAlt className="btn-icon" /> Sign In
              </>
            )}
          </button>

          <div className="signup-link">
            <p>
              Don't have an account? <Link to="/register">Sign up here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
