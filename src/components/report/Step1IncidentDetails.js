import React from "react";
import { FaMapMarkerAlt, FaClock, FaExclamationTriangle } from "react-icons/fa";

function Step1IncidentDetails({ formData, updateFormData, nextStep, prevStep }) {
  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleSeverityChange = (severity) => {
    updateFormData({ severity });
  };

  const isFormValid = () => {
    return formData.location.trim() !== "" && formData.time.trim() !== "";
  };

  return (
    <div className="step-container">
      <h2 className="step-title">Incident Details</h2>

      <div className="form-section">
        {/* Location */}
        <div className="form-group">
          <label className="form-label">
            <FaMapMarkerAlt className="label-icon" /> Location
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter incident location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </div>

        {/* ✅ FIXED: Use datetime-local instead of plain text */}
        <div className="form-group">
          <label className="form-label">
            <FaClock className="label-icon" /> Time of Incident
          </label>
          <input
            type="datetime-local"
            className="form-input"
            value={formData.time}
            onChange={(e) => handleInputChange("time", e.target.value)}
          />
          <small className="form-hint">
            Please select the exact date & time (auto-formats for database)
          </small>
        </div>

        {/* Severity */}
        <div className="form-group">
          <label className="form-label">
            <FaExclamationTriangle className="label-icon" /> Severity
          </label>
          <div className="severity-buttons">
            <button
              type="button"
              className={`severity-btn ${formData.severity === "Low" ? "active low" : "low"}`}
              onClick={() => handleSeverityChange("Low")}
            >
              Low
            </button>
            <button
              type="button"
              className={`severity-btn ${formData.severity === "Medium" ? "active medium" : "medium"}`}
              onClick={() => handleSeverityChange("Medium")}
            >
              Medium
            </button>
            <button
              type="button"
              className={`severity-btn ${formData.severity === "High" ? "active high" : "high"}`}
              onClick={() => handleSeverityChange("High")}
            >
              High
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="step-navigation">
        <button className="nav-btn back-btn" onClick={prevStep}>
          ← Back
        </button>
        <button
          className="nav-btn next-btn"
          onClick={nextStep}
          disabled={!isFormValid()}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Step1IncidentDetails;
