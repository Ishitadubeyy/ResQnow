import React from "react";

function Step4ReviewSubmit({ formData, updateFormData, prevStep }) {
  const handleSubmit = () => {
    // Here you would typically send the data to a backend
    console.log("Submitting report:", formData);
    alert("Report submitted successfully!");
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Low": return "severity-low";
      case "Medium": return "severity-medium";
      case "High": return "severity-high";
      default: return "severity-low";
    }
  };

  return (
    <div className="step-container">
      <h2 className="step-title">Review & Submit</h2>
      
      <div className="review-section">
        <div className="review-card">
          <h3>Incident Details</h3>
          <div className="review-item">
            <span className="review-label">Location:</span>
            <span className="review-value">
              {formData.location || "Not provided"}
            </span>
          </div>
          <div className="review-item">
            <span className="review-label">Time:</span>
            <span className="review-value">
              {formData.time || "Not provided"}
            </span>
          </div>
          <div className="review-item">
            <span className="review-label">Severity:</span>
            <span className={`review-value ${getSeverityColor(formData.severity)}`}>
              {formData.severity}
            </span>
          </div>
        </div>

        <div className="review-card">
          <h3>Evidence</h3>
          <div className="review-item">
            <span className="review-label">Photo:</span>
            <span className="review-value">
              {formData.photos.length > 0 ? `${formData.photos.length} photos` : "Not provided"}
            </span>
          </div>
          <div className="review-item">
            <span className="review-label">Description:</span>
            <span className="review-value">
              {formData.description || "No description provided"}
            </span>
          </div>
        </div>

        <div className="review-card">
          <h3>Injury Assessment</h3>
          <div className="review-item">
            <span className="review-label">Injuries:</span>
            <span className="review-value">
              {formData.injuries || "Not provided"}
            </span>
          </div>
          <div className="review-item">
            <span className="review-label">Witnesses:</span>
            <span className="review-value">
              {formData.witnesses.length > 0 
                ? `${formData.witnesses.length} witness(es)` 
                : "Not provided"
              }
            </span>
          </div>
        </div>
      </div>

      <div className="step-navigation">
        <button className="nav-btn back-btn" onClick={prevStep}>
          ← Back
        </button>
        <button className="nav-btn submit-btn" onClick={handleSubmit}>
          Submit Report
        </button>
      </div>
    </div>
  );
}

export default Step4ReviewSubmit;
