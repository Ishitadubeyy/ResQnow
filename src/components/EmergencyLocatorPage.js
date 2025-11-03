import React, { useState } from "react";
import LocationDisplay from "./LocationDisplay";
import { FaHospital, FaPills, FaShieldAlt, FaFireExtinguisher, FaMapMarkerAlt, FaSearch, FaFilter, FaDirections, FaPhoneAlt } from "react-icons/fa";
import MapDirectionsModal from "./MapDirectionsModal";

function EmergencyLocatorPage() {
  const [selectedFilter, setSelectedFilter] = useState("All Services");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapService, setMapService] = useState(null);

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
      actions: ["Call", "Directions"],
      phone: "(555) 123-4567"
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
      actions: ["Call", "Directions"],
      phone: "(555) 234-5678"
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
      actions: ["Call", "Directions"],
      phone: "(555) 345-6789"
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
      actions: ["Call", "Directions"],
      phone: "(555) 456-7890"
    },
    {
      id: 5,
      name: "Community Health Center",
      address: "101 Care Lane",
      type: "Hospital",
      rating: "4.4",
      distance: "1.5 miles",
      hours: "8am - 8pm",
      icon: FaHospital,
      actions: ["Call", "Directions"],
      phone: "(555) 567-8901"
    },
    {
      id: 6,
      name: "QuickCare Pharmacy",
      address: "202 Medicine Way",
      type: "Pharmacy",
      rating: "4.1",
      distance: "0.9 miles",
      hours: "9am - 9pm",
      icon: FaPills,
      actions: ["Call", "Directions"],
      phone: "(555) 678-9012"
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

  const searchedServices = filteredServices.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="locator-page">
      <div className="page-header">
        <h1>Emergency Services Locator</h1>
        <p>Find hospitals, police, fire stations, and pharmacies near you</p>
      </div>

      <div className="hero-image">
        <div className="hero-overlay">
          <h2>Emergency Services Near You</h2>
          <p>Quick access to critical services in your area</p>
        </div>
      </div>

      <div className="location-info">
        <LocationDisplay className="location-info-display" />
      </div>

      <div className="search-container">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search services by name, type, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-header">
          <h3><FaFilter className="filter-icon" /> Filter Services</h3>
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
      </div>

      <div className="services-list">
        {searchedServices.map((service) => {
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
                    <FaMapMarkerAlt className="distance-icon" /> {service.distance}
                  </span>
                  <span className="service-hours">
                    {service.hours}
                  </span>
                </div>
                <div className="service-contact">
                  <FaPhoneAlt className="phone-icon" /> {service.phone}
                </div>
              </div>
              <div className="service-actions">
                {service.actions.map((action, index) => (
                  action === "Call" ? (
                    <a
                      key={index}
                      className="action-btn call-btn"
                      href={`tel:${service.phone}`}
                      style={{ textDecoration: "none" }}
                    >
                      <FaPhoneAlt /> Call
                    </a>
                  ) : (
                    <button
                      key={index}
                      className="action-btn directions-btn"
                      onClick={() => setMapService(service)}
                    >
                      <FaDirections /> Directions
                    </button>
                  )
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {searchedServices.length === 0 && (
        <div className="no-services">
          <p>No services found for the selected filter and search criteria.</p>
        </div>
      )}
      {/* Map modal for directions */}
      {mapService && (
        <MapDirectionsModal service={mapService} onClose={() => setMapService(null)} />
      )}
    </div>
  );
}

export default EmergencyLocatorPage;
