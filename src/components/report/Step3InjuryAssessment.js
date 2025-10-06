import React, { useState } from "react";

function Step3InjuryAssessment({ formData, updateFormData, nextStep, prevStep }) {
  const [witnesses, setWitnesses] = useState(formData.witnesses || []);
  const [newWitness, setNewWitness] = useState({ name: "", phone: "" });

  const handleInjuryChange = (event) => {
    updateFormData({ injuries: event.target.value });
  };

  const addWitness = () => {
    if (newWitness.name.trim() && newWitness.phone.trim()) {
      const updatedWitnesses = [...witnesses, { ...newWitness }];
      setWitnesses(updatedWitnesses);
      updateFormData({ witnesses: updatedWitnesses });
      setNewWitness({ name: "", phone: "" });
    }
  };

  const removeWitness = (index) => {
    const updatedWitnesses = witnesses.filter((_, i) => i !== index);
    setWitnesses(updatedWitnesses);
    updateFormData({ witnesses: updatedWitnesses });
  };

  return (
    <div className="step-container">
      <h2 className="step-title">Injury Assessment</h2>
      
      <div className="form-section">
        <div className="form-group">
          <label className="form-label">
            Injuries
          </label>
          <textarea
            className="form-textarea"
            placeholder="Describe any injuries sustained..."
            value={formData.injuries}
            onChange={handleInjuryChange}
            rows={4}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Witnesses
          </label>
          
          {witnesses.length > 0 && (
            <div className="witnesses-list">
              {witnesses.map((witness, index) => (
                <div key={index} className="witness-item">
                  <div className="witness-info">
                    <span className="witness-name">{witness.name}</span>
                    <span className="witness-phone">{witness.phone}</span>
                  </div>
                  <button 
                    className="remove-witness-btn"
                    onClick={() => removeWitness(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="witness-input-group">
            <input
              type="text"
              className="form-input witness-input"
              placeholder="Full name"
              value={newWitness.name}
              onChange={(e) => setNewWitness({ ...newWitness, name: e.target.value })}
            />
            <input
              type="tel"
              className="form-input witness-input"
              placeholder="Phone number"
              value={newWitness.phone}
              onChange={(e) => setNewWitness({ ...newWitness, phone: e.target.value })}
            />
            <button className="add-witness-btn" onClick={addWitness}>
              + Add
            </button>
          </div>
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

export default Step3InjuryAssessment;
