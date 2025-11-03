import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import {
  FaAmbulance,
  FaShieldAlt,
  FaFireExtinguisher,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaPhone,
  FaExclamationTriangle,
  FaCheckCircle,
  FaEye,
  FaEdit,
  FaTrash,
  FaFilter,
  FaSort,
  FaSearch,
  FaBell,
  FaChartBar,
  FaMapMarkedAlt,
  FaSync,
  FaComments,
} from "react-icons/fa";
import LiveChatModal from "./LiveChatModal";
import "./ResponderDashboard.css";

function ResponderDashboard() {
  const [emergencies, setEmergencies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("time");
  const [searchQuery, setSearchQuery] = useState("");
  const [newAlert, setNewAlert] = useState(false);
  const [activeChatEmergency, setActiveChatEmergency] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState({});

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "responder") {
      window.location.href = "/login";
      return;
    }

    // ✅ Connect to backend WebSocket
    const socket = io("http://localhost:5000");

    // ✅ Fetch existing emergencies from MongoDB
    const fetchEmergencies = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        const token = userData?.token;
        const res = await axios.get("http://localhost:5000/api/emergencies/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmergencies(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch emergencies:", err);
      }
    };

    fetchEmergencies();

    // ✅ Listen for new emergencies in real time
    socket.on("newEmergency", (data) => {
      console.log("🚨 New Emergency received:", data);
      setEmergencies((prev) => [data, ...prev]);
      setNewAlert(true);
      setTimeout(() => setNewAlert(false), 5000);
    });

    // ✅ Listen for emergency updates (status changes)
    socket.on("emergencyUpdated", (updated) => {
      console.log("🔄 Emergency updated:", updated);
      setEmergencies((prev) =>
        prev.map((e) => (e._id === updated._id ? updated : e))
      );
    });

    // ✅ Listen for incoming chat messages
    socket.on("chatMessage", (data) => {
      const { emergencyId, sender } = data;
      // If message is from citizen and chat is not open, show notification
      if (sender !== "Responder" && activeChatEmergency?._id !== emergencyId) {
        setUnreadMessages((prev) => ({
          ...prev,
          [emergencyId]: (prev[emergencyId] || 0) + 1,
        }));
      }
    });

    return () => socket.disconnect();
  }, [activeChatEmergency]);

  // 🟢 Utility colors
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
      case "High":
        return "#dc2626";
      case "Medium":
        return "#f59e0b";
      case "Low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#dc2626";
      case "In-Progress":
      case "In Progress":
        return "#f59e0b";
      case "Resolved":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  // 🧠 Filter + sort logic
  const filteredEmergencies = emergencies.filter((emergency) => {
    const matchesStatus =
      filter === "all" ||
      emergency.status?.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      emergency.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emergency.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emergency.severity?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const sortedEmergencies = [...filteredEmergencies].sort((a, b) => {
    if (sortBy === "time") {
      return new Date(b.timeOfIncident) - new Date(a.timeOfIncident);
    } else if (sortBy === "severity") {
      const severityOrder = { High: 3, Medium: 2, Low: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    }
    return 0;
  });

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const token = userData?.token;
      await axios.put(
        `http://localhost:5000/api/emergencies/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEmergencies((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error("❌ Failed to update emergency:", err);
    }
  };

  const handleDelete = (id) => {
    setEmergencies((prev) => prev.filter((e) => e._id !== id));
  };

  const handleOpenChat = (emergency) => {
    setActiveChatEmergency(emergency);
    // Clear unread messages for this emergency
    setUnreadMessages((prev) => ({
      ...prev,
      [emergency._id]: 0,
    }));
  };

  const handleCloseChat = () => {
    setActiveChatEmergency(null);
  };

  const getTotalUnreadMessages = () => {
    return Object.values(unreadMessages).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="responder-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1>Emergency Response Dashboard</h1>
            <p>Monitor and manage all reported emergencies in real-time</p>
          </div>
          <div className="header-actions">
            <button className={`notification-btn ${newAlert ? "active" : ""}`}>
              <FaBell />
              {newAlert && <span className="notification-badge">!</span>}
            </button>
            <button 
              className={`notification-btn ${getTotalUnreadMessages() > 0 ? "active" : ""}`}
              title="Unread Messages"
            >
              <FaComments />
              {getTotalUnreadMessages() > 0 && (
                <span className="notification-badge">{getTotalUnreadMessages()}</span>
              )}
            </button>
            <button className="refresh-btn" onClick={() => window.location.reload()}>
              <FaSync />
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-search">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by description, location, or severity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="dashboard-controls">
        <div className="filter-controls">
          <FaFilter className="control-icon" />
          <label>Filter by Status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Emergencies</option>
            <option value="Active">Active</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="sort-controls">
          <FaSort className="control-icon" />
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="time">Time Reported</option>
            <option value="severity">Severity</option>
          </select>
        </div>
      </div>

      <div className="emergency-stats">
        <div className="stat-card">
          <div className="stat-icon active">
            <FaExclamationTriangle />
          </div>
          <div className="stat-content">
            <h3>{emergencies.filter((e) => e.status === "Active").length}</h3>
            <p>Active</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon in-progress">
            <FaClock />
          </div>
          <div className="stat-content">
            <h3>{emergencies.filter((e) => e.status === "In-Progress").length}</h3>
            <p>In Progress</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon resolved">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{emergencies.filter((e) => e.status === "Resolved").length}</h3>
            <p>Resolved</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon total">
            <FaChartBar />
          </div>
          <div className="stat-content">
            <h3>{emergencies.length}</h3>
            <p>Total Reports</p>
          </div>
        </div>
      </div>

      <div className="emergencies-list">
        <div className="list-header">
          <h2>Emergency Reports</h2>
          <div className="list-controls">
            <span className="result-count">{sortedEmergencies.length} found</span>
          </div>
        </div>

        {sortedEmergencies.length === 0 ? (
          <div className="no-emergencies">
            <FaExclamationTriangle className="no-emergencies-icon" />
            <h3>No Emergencies Found</h3>
            <p>No reports match your current filters.</p>
            <button
              className="clear-filters-btn"
              onClick={() => {
                setFilter("all");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="emergency-cards">
            {sortedEmergencies.map((emergency) => (
              <div key={emergency._id} className="emergency-card">
                <div className="emergency-header">
                  <div className="emergency-type">
                    <FaAmbulance className="type-icon" style={{ color: getSeverityColor(emergency.severity) }} />
                    <div className="type-info">
                      <h3>{emergency.severity} Emergency</h3>
                      <div className="type-meta">
                        <span
                          className="severity-badge"
                          style={{ backgroundColor: getSeverityColor(emergency.severity) }}
                        >
                          {emergency.severity}
                        </span>
                        <span className="time-badge">
                          <FaClock className="time-icon" />
                          {new Date(emergency.timeOfIncident).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="emergency-actions">
                    <button 
                      className={`action-btn chat-btn ${unreadMessages[emergency._id] > 0 ? 'has-unread' : ''}`}
                      onClick={() => handleOpenChat(emergency)}
                      title="Open Chat"
                    >
                      <FaComments />
                      {unreadMessages[emergency._id] > 0 && (
                        <span className="chat-notification-badge">
                          {unreadMessages[emergency._id]}
                        </span>
                      )}
                    </button>
                    <button className="action-btn delete-btn" onClick={() => handleDelete(emergency._id)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="emergency-content">
                  <div className="emergency-details">
                    <div className="detail-item">
                      <FaMapMarkerAlt className="detail-icon" />
                      <div className="detail-content">
                        <span className="detail-label">Location</span>
                        <span className="detail-value">{emergency.location}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <FaUser className="detail-icon" />
                      <div className="detail-content">
                        <span className="detail-label">Citizen</span>
                        <span className="detail-value">
                          {emergency.citizenId?.name || "Unknown"}
                        </span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <FaPhone className="detail-icon" />
                      <div className="detail-content">
                        <span className="detail-label">Contact</span>
                        <span className="detail-value">
                          {emergency.citizenId?.phone || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="emergency-description">
                    <h4>Description</h4>
                    <p>{emergency.description}</p>
                  </div>

                  <div className="emergency-footer">
                    <div className="status-controls">
                      <span className="status-label">Status:</span>
                      <select
                        value={emergency.status}
                        onChange={(e) =>
                          handleStatusUpdate(emergency._id, e.target.value)
                        }
                        className="status-select"
                        style={{ borderColor: getStatusColor(emergency.status) }}
                      >
                        <option value="Active">Active</option>
                        <option value="In-Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeChatEmergency && (
        <LiveChatModal
          emergency={activeChatEmergency}
          onClose={handleCloseChat}
          userType="responder"
        />
      )}
    </div>
  );
}

export default ResponderDashboard;