import React from "react";
import ReportButton from "./ReportButton";

function UploadSection() {
  return (
    <div className="upload-section">
      <h3 className="upload-title">Add Photos or Videos</h3>
      <p className="upload-description">Include media to provide more details about the accident</p>
      <div className="upload-button-container">
        <ReportButton text="Upload Media" color="btn-upload" />
      </div>
    </div>
  );
}

export default UploadSection;
 