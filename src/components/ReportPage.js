// frontend/pages/ReportPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Step1IncidentDetails from "./report/Step1IncidentDetails";
import Step2EvidenceCollection from "./report/Step2EvidenceCollection";
import Step3InjuryAssessment from "./report/Step3InjuryAssessment";
import Step4ReviewSubmit from "./report/Step4ReviewSubmit";
import { FaArrowLeft, FaExclamationTriangle, FaCamera, FaUserInjured, FaCheckCircle } from "react-icons/fa";

function ReportPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    time: "",
    severity: "Low",
    photos: [],
    description: "",
    injuries: "",
    witnesses: [],
  });

  const nextStep = () => currentStep < 4 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);
  const updateFormData = (newData) => setFormData((prev) => ({ ...prev, ...newData }));

  const handleFinalSubmit = async () => {
    try {
      setLoading(true);
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const token = userData?.token;
      const reportData = new FormData();
      reportData.append("location", formData.location);
      reportData.append("time", formData.time);
      reportData.append("severity", formData.severity);
      reportData.append("description", formData.description);
      reportData.append("injuries", formData.injuries);
      reportData.append("witnesses", JSON.stringify(formData.witnesses));
      if (formData.photos.length > 0) {
        formData.photos.forEach((photo) => reportData.append("photos", photo));
      }
      const res = await axios.post("http://localhost:5000/api/emergencies/report", reportData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      alert("Report submitted successfully!");
      console.log(res.data);
      setFormData({ location: "", time: "", severity: "Low", photos: [], description: "", injuries: "", witnesses: [] });
      setCurrentStep(1);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  const getStepIcon = (s) =>
    s === 1 ? <FaExclamationTriangle /> : s === 2 ? <FaCamera /> : s === 3 ? <FaUserInjured /> : <FaCheckCircle />;
  const getStepTitle = (s) =>
    s === 1 ? "Incident Details" : s === 2 ? "Evidence Collection" : s === 3 ? "Injury Assessment" : "Review & Submit";

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1IncidentDetails formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 2:
        return (
          <Step2EvidenceCollection
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Step3InjuryAssessment
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <Step4ReviewSubmit
            formData={formData}
            updateFormData={updateFormData}
            prevStep={prevStep}
            handleFinalSubmit={handleFinalSubmit}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="report-page">
      <div className="report-header">
        <Link to="/" className="back-to-home">
          <FaArrowLeft className="back-icon" /> Back to Home
        </Link>
        <h1>Report Accident</h1>
      </div>
      <div className="step-indicator">
        <div className="step-info">
          <div className="step-icon">{getStepIcon(currentStep)}</div>
          <div className="step-text">
            <h2>Step {currentStep} of 4</h2>
            <p>{getStepTitle(currentStep)}</p>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
        </div>
      </div>
      <div className="report-content">{renderStep()}</div>
    </div>
  );
}

export default ReportPage;
