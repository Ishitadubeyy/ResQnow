import React from "react";
import { FaExclamationTriangle, FaEye, FaBrain, FaCheckCircle, FaBaby, FaUserAlt, FaPhone, FaStar } from "react-icons/fa";

function GetAssistancePage() {
  const medicalCategories = [
    {
      id: "immediate",
      title: "Immediate Care",
      description: "For life-threatening injuries requiring urgent attention.",
      icon: FaExclamationTriangle,
      color: "immediate"
    },
    {
      id: "minor",
      title: "Minor Injuries",
      description: "Cuts, bruises, sprains and other non-critical injuries.",
      icon: FaEye,
      color: "minor"
    },
    {
      id: "mental",
      title: "Mental Health",
      description: "Trauma support and crisis counseling services.",
      icon: FaBrain,
      color: "mental"
    },
    {
      id: "chronic",
      title: "Chronic Conditions",
      description: "Management of existing health issues during emergencies.",
      icon: FaCheckCircle,
      color: "chronic"
    },
    {
      id: "pediatric",
      title: "Pediatric Care",
      description: "Specialized assistance for children and infants.",
      icon: FaBaby,
      color: "pediatric"
    },
    {
      id: "geriatric",
      title: "Geriatric Care",
      description: "Specialized assistance for elderly individuals.",
      icon: FaUserAlt,
      color: "geriatric"
    }
  ];

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialization: "Emergency Medicine",
      experience: "12 years",
      rating: "4.9",
      status: "Available"
    },
    {
      name: "Dr. Michael Chen",
      specialization: "Trauma Specialist",
      experience: "15 years",
      rating: "4.8",
      status: "Available"
    },
    {
      name: "Dr. Emily Rodriguez",
      specialization: "Pediatric Emergency",
      experience: "10 years",
      rating: "4.9",
      status: "Offline"
    }
  ];

  const emergencyContacts = [
    {
      name: "Call Emergency Services (112)",
      number: "112",
      icon: FaPhone,
      availability: "24/7"
    },
    {
      name: "Poison Control",
      number: "+91 1002356498",
      icon: "☠️",
      availability: "24/7"
    }
  ];

  return (
    <div className="assistance-page">
      <div className="page-header">
        <h1>Get Assistance</h1>
        <p>Connect with medical professionals instantly</p>
      </div>

      <div className="medical-categories">
        <h2>Medical Assistance Categories</h2>
        <div className="categories-grid">
          {medicalCategories.map((category) => (
            <div key={category.id} className={`category-card ${category.color}`}>
              <div className="category-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="available-doctors">
        <h2>Available Doctors</h2>
        <div className="doctors-list">
          {doctors.map((doctor, index) => (
            <div key={index} className="doctor-card">
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p className="specialization">{doctor.specialization}</p>
                <p className="experience">{doctor.experience} experience</p>
                <div className="rating">
                  <span className="star">⭐</span>
                  <span>{doctor.rating}</span>
                </div>
              </div>
              <div className="doctor-actions">
                <button className="action-btn call-btn">Call</button>
                <button className="action-btn video-btn">Video</button>
                <button className="action-btn chat-btn">Chat</button>
              </div>
              <div className={`status ${doctor.status.toLowerCase()}`}>
                {doctor.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="emergency-contacts">
        <h2>Emergency Contacts</h2>
        <div className="contacts-list">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="contact-card">
              <div className="contact-icon">{contact.icon}</div>
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <p className="contact-number">{contact.number}</p>
              </div>
              <div className="contact-availability">
                {contact.availability}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetAssistancePage;
