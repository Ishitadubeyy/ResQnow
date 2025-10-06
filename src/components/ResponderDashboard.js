import React, { useState, useEffect } from 'react';
import { FaAmbulance, FaShieldAlt, FaFireExtinguisher, FaMapMarkerAlt, FaClock, FaUser, FaPhone, FaExclamationTriangle, FaCheckCircle, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import './ResponderDashboard.css';

function ResponderDashboard() {
  // Basic authentication check - in a real app, this would be more sophisticated
  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType !== 'responder') {
      // Redirect to login if not authenticated as responder
      window.location.href = '/login';
    }
  }, []);
  const [emergencies, setEmergencies] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('time');

  // Sample emergency data
  const sampleEmergencies = [
    {
      id: 1,
      type: 'Medical Emergency',
      severity: 'High',
      location: '123 Main Street, Downtown',
      time: '2024-01-15 14:30',
      reporter: 'John Smith',
      phone: '+1-555-0123',
      description: 'Car accident with injuries, multiple people involved',
      status: 'Active',
      priority: 'Critical',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      icon: FaAmbulance,
      color: '#dc2626'
    },
    {
      id: 2,
      type: 'Fire Emergency',
      severity: 'Critical',
      location: '456 Oak Avenue, Residential Area',
      time: '2024-01-15 13:45',
      reporter: 'Sarah Johnson',
      phone: '+1-555-0456',
      description: 'House fire, smoke visible from multiple floors',
      status: 'In Progress',
      priority: 'Critical',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      icon: FaFireExtinguisher,
      color: '#ea580c'
    },
    {
      id: 3,
      type: 'Police Emergency',
      severity: 'Medium',
      location: '789 Pine Street, Commercial District',
      time: '2024-01-15 12:15',
      reporter: 'Mike Davis',
      phone: '+1-555-0789',
      description: 'Suspicious activity reported, possible break-in',
      status: 'Resolved',
      priority: 'Medium',
      coordinates: { lat: 40.7505, lng: -73.9934 },
      icon: FaShieldAlt,
      color: '#059669'
    },
    {
      id: 4,
      type: 'Medical Emergency',
      severity: 'Low',
      location: '321 Elm Street, Suburbs',
      time: '2024-01-15 11:20',
      reporter: 'Lisa Wilson',
      phone: '+1-555-0321',
      description: 'Minor injury, person fell and needs assistance',
      status: 'Active',
      priority: 'Low',
      coordinates: { lat: 40.6892, lng: -74.0445 },
      icon: FaAmbulance,
      color: '#dc2626'
    },
    {
      id: 5,
      type: 'Traffic Accident',
      severity: 'High',
      location: '654 Maple Drive, Highway',
      time: '2024-01-15 10:30',
      reporter: 'Tom Brown',
      phone: '+1-555-0654',
      description: 'Multi-vehicle collision on highway, traffic blocked',
      status: 'In Progress',
      priority: 'High',
      coordinates: { lat: 40.6782, lng: -73.9442 },
      icon: FaAmbulance,
      color: '#dc2626'
    }
  ];

  useEffect(() => {
    setEmergencies(sampleEmergencies);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return '#dc2626';
      case 'High': return '#ea580c';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#dc2626';
      case 'In Progress': return '#f59e0b';
      case 'Resolved': return '#10b981';
      default: return '#6b7280';
    }
  };

  const filteredEmergencies = emergencies.filter(emergency => {
    if (filter === 'all') return true;
    return emergency.status.toLowerCase() === filter.toLowerCase();
  });

  const sortedEmergencies = [...filteredEmergencies].sort((a, b) => {
    if (sortBy === 'time') {
      return new Date(b.time) - new Date(a.time);
    } else if (sortBy === 'severity') {
      const severityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    }
    return 0;
  });

  const handleStatusUpdate = (id, newStatus) => {
    setEmergencies(prev => 
      prev.map(emergency => 
        emergency.id === id ? { ...emergency, status: newStatus } : emergency
      )
    );
  };

  const handleDelete = (id) => {
    setEmergencies(prev => prev.filter(emergency => emergency.id !== id));
  };

  return (
    <div className="responder-dashboard">
      <div className="dashboard-header">
        <h1>Emergency Response Dashboard</h1>
        <p>Monitor and manage all reported emergencies</p>
      </div>

      <div className="dashboard-controls">
        <div className="filter-controls">
          <label>Filter by Status:</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Emergencies</option>
            <option value="active">Active</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="sort-controls">
          <label>Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="time">Time Reported</option>
            <option value="severity">Severity Level</option>
          </select>
        </div>
      </div>

      <div className="emergency-stats">
        <div className="stat-card">
          <div className="stat-icon active">
            <FaExclamationTriangle />
          </div>
          <div className="stat-content">
            <h3>{emergencies.filter(e => e.status === 'Active').length}</h3>
            <p>Active Emergencies</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon in-progress">
            <FaClock />
          </div>
          <div className="stat-content">
            <h3>{emergencies.filter(e => e.status === 'In Progress').length}</h3>
            <p>In Progress</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon resolved">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{emergencies.filter(e => e.status === 'Resolved').length}</h3>
            <p>Resolved</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon total">
            <FaEye />
          </div>
          <div className="stat-content">
            <h3>{emergencies.length}</h3>
            <p>Total Reports</p>
          </div>
        </div>
      </div>

      <div className="emergencies-list">
        <h2>Emergency Reports</h2>
        {sortedEmergencies.length === 0 ? (
          <div className="no-emergencies">
            <p>No emergencies found matching your criteria.</p>
          </div>
        ) : (
          <div className="emergency-cards">
            {sortedEmergencies.map(emergency => (
              <div key={emergency.id} className="emergency-card">
                <div className="emergency-header">
                  <div className="emergency-type">
                    <emergency.icon className="type-icon" style={{ color: emergency.color }} />
                    <div className="type-info">
                      <h3>{emergency.type}</h3>
                      <span 
                        className="severity-badge"
                        style={{ backgroundColor: getSeverityColor(emergency.severity) }}
                      >
                        {emergency.severity}
                      </span>
                    </div>
                  </div>
                  <div className="emergency-actions">
                    <button 
                      className="action-btn view-btn"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="action-btn edit-btn"
                      title="Edit Status"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      title="Delete Report"
                      onClick={() => handleDelete(emergency.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="emergency-content">
                  <div className="emergency-details">
                    <div className="detail-item">
                      <FaMapMarkerAlt className="detail-icon" />
                      <span>{emergency.location}</span>
                    </div>
                    <div className="detail-item">
                      <FaClock className="detail-icon" />
                      <span>{emergency.time}</span>
                    </div>
                    <div className="detail-item">
                      <FaUser className="detail-icon" />
                      <span>{emergency.reporter}</span>
                    </div>
                    <div className="detail-item">
                      <FaPhone className="detail-icon" />
                      <span>{emergency.phone}</span>
                    </div>
                  </div>

                  <div className="emergency-description">
                    <p>{emergency.description}</p>
                  </div>

                  <div className="emergency-footer">
                    <div className="status-controls">
                      <span className="status-label">Status:</span>
                      <select 
                        value={emergency.status}
                        onChange={(e) => handleStatusUpdate(emergency.id, e.target.value)}
                        className="status-select"
                        style={{ borderColor: getStatusColor(emergency.status) }}
                      >
                        <option value="Active">Active</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                    <div className="priority-info">
                      <span className="priority-label">Priority:</span>
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: getSeverityColor(emergency.severity) }}
                      >
                        {emergency.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResponderDashboard;
