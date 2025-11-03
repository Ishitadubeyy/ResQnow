import React, { useState } from "react";
import axios from "axios";

function Step4ReviewSubmit({ formData, updateFormData, prevStep }) {
  const [loading, setLoading] = useState(false);

  // --- Handle actual submission ---
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // get citizen token from localStorage
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const token = userData?.token;
      if (!token) {
        alert("Please login again — no token found.");
        setLoading(false); // ✅ important fix: reset loading if token missing
        return;
      }

      // build FormData to send files + JSON data
      const reportData = new FormData();
      reportData.append("location", formData.location);
      reportData.append("time", formData.time);
      reportData.append("severity", formData.severity);
      reportData.append("description", formData.description);
      reportData.append("injuries", formData.injuries);
      reportData.append("witnesses", JSON.stringify(formData.witnesses || []));
      if (formData.photos?.length > 0) {
        formData.photos.forEach((photo) => reportData.append("photos", photo));
      }

      // --- send to backend ---
      const res = await axios.post(
        "http://localhost:5000/api/emergencies/report",
        reportData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Report submitted successfully!");
      console.log("Response from backend:", res.data);

      // reset form
      updateFormData({
        location: "",
        time: "",
        severity: "Low",
        photos: [],
        description: "",
        injuries: "",
        witnesses: [],
      });
    } catch (err) {
      console.error("❌ Error submitting report:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to submit report. Check console.");
    } finally {
      setLoading(false);
    }
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
            <span className="review-value">{formData.location || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Time:</span>
            <span className="review-value">{formData.time || "Not provided"}</span>
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
            <span className="review-value">{formData.injuries || "Not provided"}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Witnesses:</span>
            <span className="review-value">
              {formData.witnesses.length > 0
                ? `${formData.witnesses.length} witness(es)`
                : "Not provided"}
            </span>
          </div>
        </div>
      </div>

      <div className="step-navigation">
        <button className="nav-btn back-btn" onClick={prevStep}>
          ← Back
        </button>
        <button
          className="nav-btn submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </div>
    </div>
  );
}

export default Step4ReviewSubmit;
