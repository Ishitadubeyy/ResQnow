import React from "react";

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
        <div className="form-group">
          <label className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter incident location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Time of Incident
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. 10:30 AM"
            value={formData.time}
            onChange={(e) => handleInputChange("time", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Severity
          </label>
          <div className="severity-buttons">
            <button
              className={`severity-btn ${formData.severity === "Low" ? "active low" : "low"}`}
              onClick={() => handleSeverityChange("Low")}
            >
              Low
            </button>
            <button
              className={`severity-btn ${formData.severity === "Medium" ? "active medium" : "medium"}`}
              onClick={() => handleSeverityChange("Medium")}
            >
              Medium
            </button>
            <button
              className={`severity-btn ${formData.severity === "High" ? "active high" : "high"}`}
              onClick={() => handleSeverityChange("High")}
            >
              High
            </button>
          </div>
        </div>
      </div>

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
