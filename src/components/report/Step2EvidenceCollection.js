import React, { useRef } from "react";

function Step2EvidenceCollection({ formData, updateFormData, nextStep, prevStep }) {
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = [...formData.photos, ...files];
    updateFormData({ photos: newPhotos });
  };

  const handleDescriptionChange = (event) => {
    updateFormData({ description: event.target.value });
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="step-container">
      <h2 className="step-title">Evidence Collection</h2>
      
      <div className="form-section">
        <div className="photo-upload-section">
          <div className="upload-area" onClick={triggerFileUpload}>
            <div className="upload-icon">📷</div>
            <p className="upload-text">Tap to add photo</p>
            <button className="upload-btn">Upload Photo</button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
            accept="image/*"
            multiple
            style={{ display: "none" }}
          />
          
          {formData.photos.length > 0 && (
            <div className="uploaded-photos">
              <p>Uploaded Photos: {formData.photos.length}</p>
              <div className="photo-preview">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="photo-item">
                    <img 
                      src={URL.createObjectURL(photo)} 
                      alt={`Upload ${index + 1}`}
                      className="preview-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Description
          </label>
          <textarea
            className="form-textarea"
            placeholder="Describe what happened..."
            value={formData.description}
            onChange={handleDescriptionChange}
            rows={4}
          />
        </div>
      </div>

      <div className="step-navigation">
        <button className="nav-btn back-btn" onClick={prevStep}>
          ← Back
        </button>
        <button className="nav-btn next-btn" onClick={nextStep}>
          Next →
        </button>
      </div>
    </div>
  );
}

export default Step2EvidenceCollection;
