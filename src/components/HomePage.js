import React from "react";
import { Link } from "react-router-dom";
import LocationDisplay from "./LocationDisplay";
import EmergencyCarousel from "./EmergencyCarousel";
import { FaAmbulance, FaShieldAlt, FaFireExtinguisher } from "react-icons/fa";

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-title-container">
            <div className="title-decoration">
              <div className="decoration-circle circle-1"></div>
              <div className="decoration-circle circle-2"></div>
              <div className="decoration-circle circle-3"></div>
            </div>
            <h1 className="hero-title">ResQNow</h1>
            <p className="hero-subtitle">Emergency Response System</p>
          </div>
        </div>
      </div>

      {/* Emergency Response Carousel */}
      <EmergencyCarousel />

      {/* Need Help Section */}
      <div className="need-help-section">
        <div className="need-help-content">
          <div className="hero-cta">
            <p className="cta-text">Need Help?</p>
            <p className="cta-subtext">We're here for you 24/7</p>
            <div className="hero-location">
              <LocationDisplay showPermissionButton={true} />
            </div>
          </div>
          
          {/* Emergency Contact Buttons */}
          <div className="emergency-buttons">
            <button className="emergency-btn ambulance">
              <div className="emergency-icon">
                <FaAmbulance />
              </div>
              <div className="emergency-text">
                <span className="emergency-label">Ambulance</span>
                <span className="emergency-number">112</span>
              </div>
            </button>
            <button className="emergency-btn police">
              <div className="emergency-icon">
                <FaShieldAlt />
              </div>
              <div className="emergency-text">
                <span className="emergency-label">Police</span>
                <span className="emergency-number">100</span>
              </div>
            </button>
            <button className="emergency-btn fire">
              <div className="emergency-icon">
                <FaFireExtinguisher />
              </div>
              <div className="emergency-text">
                <span className="emergency-label">Fire Dept</span>
                <span className="emergency-number">101</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="main-actions">
        <Link to="/report" className="action-card">
          <h3>Report an Accident</h3>
          <p>Quickly report incidents with photos and details</p>
        </Link>
        
        <Link to="/assistance" className="action-card">
          <h3>Get Assistance</h3>
          <p>Connect with medical professionals instantly</p>
        </Link>
        
        <Link to="/locator" className="action-card">
          <h3>Emergency Locator</h3>
          <p>Find nearby hospitals and emergency services</p>
        </Link>
      </div>


      {/* Safety Tips */}
      <div className="safety-tips">
        <h3>Safety Tips</h3>
        <div className="tips-card">
          <ul>
            <li>Always keep your emergency contacts updated in the app settings for faster response times.</li>
            <li>Enable location services to help emergency responders find you quickly.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 