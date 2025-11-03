import React, { useEffect, useState } from "react";
import {
  FaExclamationTriangle,
  FaEye,
  FaBrain,
  FaHeartbeat,
  FaBaby,
  FaUserAlt,
  FaFirstAid,
  FaWheelchair,
  FaPhone,
  FaSkullCrossbones,
  FaAmbulance,
  FaVideo,
  FaComments,
  FaStar,
} from "react-icons/fa";
import axios from "axios";
import LiveChatModal from "./LiveChatModal";

function GetAssistancePage() {
  const [responders, setResponders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatResponder, setChatResponder] = useState(null);

  useEffect(() => {
    const fetchResponders = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("userData"))?.token;
        const res = await axios.get("http://localhost:5000/api/responders/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResponders(res.data);
      } catch (err) {
        console.error("Error fetching responders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResponders();
  }, []);

  const medicalCategories = [
    { id: "immediate", title: "Immediate Care", description: "For life-threatening injuries requiring urgent attention.", icon: FaExclamationTriangle, iconBg: "#dc2626" },
    { id: "minor", title: "Minor Injuries", description: "Cuts, bruises, sprains and other non-critical injuries.", icon: FaEye, iconBg: "#f8b4cb" },
    { id: "mental", title: "Mental Health", description: "Trauma support and crisis counseling services.", icon: FaBrain, iconBg: "#8b5cf6" },
    { id: "chronic", title: "Chronic Conditions", description: "Management of existing health issues during emergencies.", icon: FaHeartbeat, iconBg: "#ec4899" },
    { id: "pediatric", title: "Pediatric Care", description: "Specialized assistance for children and infants.", icon: FaBaby, iconBg: "#f59e0b" },
    { id: "geriatric", title: "Geriatric Care", description: "Specialized assistance for elderly individuals.", icon: FaUserAlt, iconBg: "#10b981" },
    { id: "firstaid", title: "First Aid", description: "Basic medical assistance and wound care.", icon: FaFirstAid, iconBg: "#3b82f6" },
    { id: "mobility", title: "Mobility Support", description: "Assistance for individuals with mobility challenges.", icon: FaWheelchair, iconBg: "#059669" },
  ];

  const emergencyContacts = [
    { name: "Call Emergency Services (112)", number: "112", icon: FaPhone, availability: "24/7", color: "#dc2626" },
    { name: "Poison Control", number: "+91 1002356498", icon: FaSkullCrossbones, availability: "24/7", color: "#000000" },
    { name: "Ambulance Services", number: "102", icon: FaAmbulance, availability: "24/7", color: "#ea580c" },
  ];

  const handleCall = (responder) => {
    window.location.href = `tel:${responder.phone}`;
  };

  const handleVideo = (responder) => {
    alert(`Starting video call with ${responder.name}`);
  };

  const handleChat = (responder) => {
  console.log("Chat clicked for:", responder); // Debug log
  setChatResponder({
    id: responder._id,
    name: responder.name,
    field: responder.field,
  });
  console.log("Chat responder set"); // Debug log
};

  return (
    <div className="assistance-page">
      <div className="page-header">
        <h1>Get Medical Assistance</h1>
        <p>Connect with certified responders instantly for emergency care</p>
      </div>

      <div className="medical-categories">
        <h2>Medical Assistance Categories</h2>
        <div className="categories-grid">
          {medicalCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="category-card">
                <div className="category-icon" style={{ backgroundColor: category.iconBg }}>
                  <Icon />
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="available-doctors">
        <h2>Available Responders</h2>
        {loading ? (
          <p>Loading responders...</p>
        ) : responders.length === 0 ? (
          <p>No responders available at the moment.</p>
        ) : (
          <div className="doctors-list">
            {responders.map((responder) => (
              <div key={responder._id} className="doctor-card">
                <div className="doctor-image">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
                    alt={responder.name}
                  />
                </div>
                <div className="doctor-info">
                  <h3>{responder.name}</h3>
                  <p className="specialization">{responder.field || "General"}</p>
                  <p className="experience">
                    {responder.experience
                      ? `${responder.experience} years experience`
                      : "Experience not available"}
                  </p>
                  <div className="rating">
                    <FaStar /> 4.8
                  </div>
                  <p className="phone">📞 {responder.phone}</p>
                  <p className="cert">
                    {responder.certificationType} — #{responder.certificationNumber}
                  </p>
                </div>
                <div className="doctor-actions">
                  <button className="action-btn call-btn" onClick={() => handleCall(responder)}>
                    <FaPhone /> Call
                  </button>
                  <button className="action-btn video-btn" onClick={() => handleVideo(responder)}>
                    <FaVideo /> Video
                  </button>
                  <button className="action-btn chat-btn" onClick={() => handleChat(responder)}>
                    <FaComments /> Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="emergency-contacts">
        <h2>Emergency Contacts</h2>
        <div className="contacts-list">
          {emergencyContacts.map((contact, i) => {
            const Icon = contact.icon;
            return (
              <div key={i} className="contact-card">
                <div className="contact-icon" style={{ color: contact.color }}>
                  <Icon />
                </div>
                <div className="contact-info">
                  <h3>{contact.name}</h3>
                  <p className="contact-number">{contact.number}</p>
                </div>
                <div className="contact-availability">{contact.availability}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Chat Modal */}
      {chatResponder && (
        <LiveChatModal
          service={chatResponder}
          onClose={() => setChatResponder(null)}
        />
      )}
    </div>
  );
}

export default GetAssistancePage;