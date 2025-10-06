import React, { useState } from "react";
import { Link } from "react-router-dom";
import Step1IncidentDetails from "./report/Step1IncidentDetails";
import Step2EvidenceCollection from "./report/Step2EvidenceCollection";
import Step3InjuryAssessment from "./report/Step3InjuryAssessment";
import Step4ReviewSubmit from "./report/Step4ReviewSubmit";

function ReportPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    location: "",
    time: "",
    severity: "Low",
    photos: [],
    description: "",
    injuries: "",
    witnesses: []
  });

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1IncidentDetails
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
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
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="report-page">
      <div className="report-header">
        <Link to="/" className="back-to-home">← Back to Home</Link>
        <h1>Report Accident</h1>
        <div></div>
      </div>
      
      <div className="step-indicator">
        <p>Step {currentStep} of 4</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="report-content">
        {renderStep()}
      </div>
    </div>
  );
}

export default ReportPage;
