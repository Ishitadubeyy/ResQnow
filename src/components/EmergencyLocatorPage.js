import React, { useState } from "react";
import LocationDisplay from "./LocationDisplay";
import { FaHospital, FaPills, FaShieldAlt, FaFireExtinguisher } from "react-icons/fa";

function EmergencyLocatorPage() {
  const [selectedFilter, setSelectedFilter] = useState("All Services");

  const filterOptions = [
    "All Services",
    "Hospitals",
    "Police Stations",
    "Fire Stations",
    "Pharmacies"
  ];

  const nearbyServices = [
    {
      id: 1,
      name: "City General Hospital",
      address: "123 Medical Drive",
      type: "Hospital",
      rating: "4.7",
      distance: "0.3 miles",
      hours: "24/7",
      icon: FaHospital,
      actions: ["Call", "Directions"]
    },
    {
      id: 2,
      name: "HealthPlus Pharmacy",
      address: "321 Wellness St",
      type: "Pharmacy",
      rating: "4.3",
      distance: "0.5 miles",
      hours: "8am - 10pm",
      icon: FaPills,
      actions: ["Call", "Directions"]
    },
    {
      id: 3,
      name: "Central Police Station",
      address: "456 Safety Ave",
      type: "Police Station",
      rating: "4.5",
      distance: "0.8 miles",
      hours: "24/7",
      icon: FaShieldAlt,
      actions: ["Call", "Directions"]
    },
    {
      id: 4,
      name: "Fire Station #1",
      address: "789 Emergency Blvd",
      type: "Fire Station",
      rating: "4.6",
      distance: "1.2 miles",
      hours: "24/7",
      icon: FaFireExtinguisher,
      actions: ["Call", "Directions"]
    }
  ];

  const filteredServices = selectedFilter === "All Services" 
    ? nearbyServices 
    : nearbyServices.filter(service => 
        service.type === selectedFilter || 
        (selectedFilter === "Hospitals" && service.type === "Hospital") ||
        (selectedFilter === "Police Stations" && service.type === "Police Station") ||
        (selectedFilter === "Fire Stations" && service.type === "Fire Station") ||
        (selectedFilter === "Pharmacies" && service.type === "Pharmacy")
      );

  return (
    <div className="locator-page">
      <div className="page-header">
        <h1>Nearby Services</h1>
        <p>Find hospitals, police, and emergency services</p>
      </div>

      <div className="hero-image">
        <div className="hero-overlay">
          <h2>Emergency Services Near You</h2>
        </div>
      </div>

      <div className="location-info">
        <LocationDisplay className="location-info-display" />
      </div>

      <div className="filter-buttons">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${selectedFilter === filter ? "active" : ""}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="services-list">
        {filteredServices.map((service) => {
          const IconComponent = service.icon;
          return (
            <div key={service.id} className="service-card">
              <div className="service-image">
                <div className="service-icon">
                  <IconComponent />
                </div>
              </div>
            <div className="service-info">
              <h3 className="service-name">{service.name}</h3>
              <p className="service-address">{service.address}</p>
              <div className="service-details">
                <span className="service-rating">
                  ⭐ {service.rating}
                </span>
                <span className="service-distance">
                  {service.distance}
                </span>
                <span className="service-hours">
                  {service.hours}
                </span>
              </div>
            </div>
            <div className="service-actions">
              {service.actions.map((action, index) => (
                <button
                  key={index}
                  className={`action-btn ${action === "Call" ? "call-btn" : "directions-btn"}`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="no-services">
          <p>No services found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}

export default EmergencyLocatorPage;
