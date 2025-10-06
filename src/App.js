  import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation as useRouterLocation } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import ReportPage from "./components/ReportPage";
import GetAssistancePage from "./components/GetAssistancePage";
import EmergencyLocatorPage from "./components/EmergencyLocatorPage";
import ResponderDashboard from "./components/ResponderDashboard";
import Logo from "./components/Logo";
import { LocationProvider } from "./contexts/LocationContext";
import "./App.css";

function Navigation() {
  const location = useRouterLocation();
  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on component mount
    const storedUserType = localStorage.getItem('userType');
    const storedAuth = localStorage.getItem('isAuthenticated');
    
    if (storedUserType && storedAuth === 'true') {
      setUserType(storedUserType);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('isAuthenticated');
    setUserType(null);
    setIsAuthenticated(false);
    window.location.href = '/';
  };
  
  return (
    <nav className="navigation">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <Logo className="nav-logo-icon" size={32} />
          <span className="nav-logo-text">ResQNow</span>
        </Link>
        <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
          Home
        </Link>
        <Link to="/assistance" className={location.pathname === "/assistance" ? "nav-link active" : "nav-link"}>
          Get Assistance
        </Link>
        <Link to="/locator" className={location.pathname === "/locator" ? "nav-link active" : "nav-link"}>
          Emergency Locator
        </Link>
        {isAuthenticated && userType === 'responder' && (
          <Link to="/dashboard" className={location.pathname === "/dashboard" ? "nav-link active" : "nav-link"}>
            Responder Dashboard
          </Link>
        )}
      </div>
      <div className="nav-right">
        {isAuthenticated ? (
          <>
            <span className="user-info">Welcome, {userType === 'responder' ? 'Responder' : 'Citizen'}</span>
            <button onClick={handleLogout} className="nav-link logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={location.pathname === "/login" ? "nav-link active" : "nav-link"}>
              Login
            </Link>
            <Link to="/register" className={location.pathname === "/register" ? "nav-link active" : "nav-link"}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ResQNow</h3>
          <p>Emergency Response System</p>
          <p>We're here for you 24/7</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/report">Report Accident</Link></li>
            <li><Link to="/assistance">Get Assistance</Link></li>
            <li><Link to="/locator">Emergency Locator</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Emergency Contacts</h4>
          <ul>
            <li>Ambulance: 108</li>
            <li>Police: 100</li>
            <li>Fire Department: 101</li>
            <li>Poison Control: +91 1002356498</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@resqnow.com</p>
          <p>Phone: +91 97745863217</p>
          <p>Address: 123 Emergency St, MUMBAI</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 ResQNow. All rights reserved.</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <LocationProvider>
      <Router>
        <div className="app">
          {/* Navigation Bar */}
          <Navigation />

          {/* Main Content Area */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/assistance" element={<GetAssistancePage />} />
              <Route path="/locator" element={<EmergencyLocatorPage />} />
              <Route path="/dashboard" element={<ResponderDashboard />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </LocationProvider>
  );
}

export default App;
